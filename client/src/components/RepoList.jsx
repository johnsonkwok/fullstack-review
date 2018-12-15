import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = ({repos, count}) => (
  <div>
    <h3> Top 25 Forked Repos in Database </h3>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Name</th>
          <th>Forks</th>
          <th>Stars</th>
        </tr>
      </thead>
      <tbody>
        {repos.map((repo, idx) => (
          <RepoListItem key={idx} repo={repo} />
        ))}
      </tbody>
    </table>
    <br /><br />
    <div>
      There are {count} repos in the database.
    </div>
  </div>
)

export default RepoList;