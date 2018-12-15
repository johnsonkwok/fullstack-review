const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const getReposByUsername = require('./../helpers/github.js').getReposByUsername;
const save = require('../database/index.js').save;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  const username = req.body.term;
  getReposByUsername(username, function(err, repos) {
    if (err) {
      console.error(err);
      res.sendStatus(501);
    } else {
      save(repos);
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

