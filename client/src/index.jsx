import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.updateHomepage = this.updateHomepage.bind(this);
  }

  updateHomepage() {
    return fetch('/repos')
      .then((results) => {
        return results.json();
      }).then((repos) => {
        return this.setState({repos});
      }).then(() => {
        return fetch('/count');
      }).then((result) => {
        return result.json();
      }).then((count) => {
        this.setState({count});
      });
  }

  componentDidMount() {
    this.updateHomepage();
  }

  search(term) {
    console.log(`${term} was searched.`);
    const updateHome = this.updateHomepage;
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: {term},
      error: () => {console.log('Search POST request failed.')},
      success: () => {
        console.log('Search POST request successful.');
      }
    }).done(() => {
      this.updateHomepage();
    });
    $('#search').val('');
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList count={this.state.count} repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));