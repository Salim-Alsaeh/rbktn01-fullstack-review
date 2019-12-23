const config = require('../config.js');
const axios = require('axios');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    headers: {
      "Content-Type" : "application/vnd.github.v3+json",
      "Authorization" : `token ${configVars.TOKEN}`
    }
  };

   axios.get(`${config.API_BASE_URL}/${username}/repos`, options)
      .then((result) => {
        if (result.data.length !== 0){
          //res.json(result.data)
          return result.data;
        } else {
          res.status(400).json('empty')
        }
      })
      .then((resultData) => {
        Repo.insertMany(resultData)
            .then((docs) => {
              res.status(201).json(docs);
            })
            .catch((err) => {
              res.status(400).json(err)
            })
      })
      .catch((err) => {
        res.json(err)
      })

};

module.exports.getReposByUsername = getReposByUsername;
