const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function() {
  console.log('Connected to database "fetcher"');
});

let repoSchema = mongoose.Schema({
  user: String,
  name: {type: String, unique: true},
  html_url: String,
  description: String,
  stargazers_count: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  if (repos === null) {
    return;
  } else if (Array.isArray(repos)) {
    Repo.init()
      .then(() => {
        Repo.insertMany(repos);
      });
  } else {
    let newRepo = new Repo(repos);
    newRepo.save(function(err, newRepo) {
      if (err) { return console.error(err) };
    });
  }
  
}

module.exports.save = save;