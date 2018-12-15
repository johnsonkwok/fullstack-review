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

  }

  componentDidMount() {
    return fetch('/repos')
      .then((results) => {
        return results.json();
      }).then((repos) => {
        this.setState({repos});
      });
  }

  search(term) {
    console.log(`${term} was searched.`);
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: {term},
      error: () => {console.log('Search POST request failed.')},
      success: () => {console.log('Search POST request successful.')}
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));