import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      options : {
        headers: {'Content-Type': 'application/json'}
      }
    }

  }
  componentDidMount() {
    axios.get(`http://127.0.0.1:1128/repos`)
        .then(res => {
          console.log(res);
          this.setState({repos: res.data})
        })
        .catch(err => {
          // if(err.response.status === 404) {
          //   //TODO handling 404 error
          // } else {
          //   //TODO handling any other error
          // }
        })
  }

  search (term) {
    console.log(`${term} was searched`);
    axios.post(`http://127.0.0.1:1128/repos`, {
      username: term
    })
        .then(res => {
          this.setState({repos: this.state.repos})
        })
        .catch(err => {
          console.log(err)
        })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
