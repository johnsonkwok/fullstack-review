import React from 'react';
import RepoListItem from './RepoListItem.jsx';

const RepoList = ({repos}) => (
  <div>
    <h3> Repo List </h3>
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
      There are {repos.length} repos.
    </div>
  </div>
)

export default RepoList;