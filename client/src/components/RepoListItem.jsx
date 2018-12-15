import React from 'react';

const RepoListItem = ({repo}) => (
  <tr>
    <td>
      {repo.user}
    </td>
    <td>
      <a href={`${repo.html_url}`}>
      {repo.name}
      </a>
    </td>
    <td>
      {repo.forks}
    </td>
    <td>
      {repo.stargazers_count}
    </td>
  </tr>
);

export default RepoListItem;
