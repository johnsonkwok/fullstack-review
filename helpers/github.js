const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos?per_page=100`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, (err, res, body) => {
    // console.log(JSON.parse(res.body).length);   // Number of search results returned from Github API
    const parsedBody = JSON.parse(body);
    if (parsedBody.message === 'Not Found') {
      body = null;
      console.log('The username does not exist.');
    } else {
      body = parsedBody.map((repo) => {
        const {owner: {login: user}, name, html_url, description, stargazers_count, forks} = repo;
        const userObj = {user, name, html_url, description, stargazers_count, forks};
        return userObj;
      });
    }
    callback(err, body);
  });
};

module.exports.getReposByUsername = getReposByUsername;