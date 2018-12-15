const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const getReposByUsername = require('./../helpers/github.js').getReposByUsername;
const save = require('../database/index.js').save;
const Repo = require('../database/index.js').Repo;

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
  return Repo.find()
    .sort('-forks')
    .limit(25)
    .exec()
    .then((repos) => {
      const docs = repos.map(model => model._doc);
      return docs;
    }).then((docs) => {
      res.send(docs);
    }).catch((err) => {
      console.error(err);
      res.sendStatus(501);
    });
});

app.get('/count', (req, res) => {
  return Repo.count()
    .then((count) => {
      res.send(JSON.stringify(count));
    });
});

let port = 1128;

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

