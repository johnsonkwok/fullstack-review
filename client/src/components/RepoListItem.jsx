import React from 'react';

const RepoListItem = ({repo}) => (
  <tr>
    <td>
      {repo.user}
    </td>
    <td>
      {repo.name}
    </td>
    <td>
      {repo.html_url}
    </td>
    <td>
      {repo.forks}
    </td>
  
  </tr>
);

export default RepoListItem;
