const express = require('express');
const app = express();
const getReposByUsername = require('./../helpers/github.js').getReposByUsername;
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const username = Object.keys(req.body)[0];
  getReposByUsername(username, function(err, repos) {
    if (err) {
      console.error(err);
    } else {
      // console.log('The results from the github API:', repos);
      res.sendStatus(201);
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('GET recvd');
});

let port = 1128;

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

