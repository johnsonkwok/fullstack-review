const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  full_name: String,
  html_url: String,
  description: String,
  stargazers_count: String,
  forks: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to the MongoDB
  // let newRepo = new Repo(data);
  // newRepo.save(function(err, newRepo) {
  //   if (err) { return console.error(err) };
  // });
}

module.exports.save = save;