import React from 'react';

const RepoList = (props) => (
  <div>
      <ul>
          {
              props.repos.map(repo => (
                  <div>
                      <li>
                          username: {repo.owner.login}
                          / Id: {repo.id}
                          / forks: {repo.forks_count}
                          / <a href={repo.html_url}>repo url</a>
                      </li>
                  </div>
              ))
          }
      </ul>
    {/*<h4> Repo List Component </h4>*/}
    {/*There are {props.repos.length} repos.*/}
  </div>
);

export default RepoList;
