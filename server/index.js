const express = require('express');
const axios = require('axios');
const cors = require('cors');

const Repo = require('../database/index');
const configVars = require('../config');
const API_BASE_URL = 'https://api.github.com/users';

var getReposByUsername = require('../helpers/github');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post('/repos', function (req, res) {

    const username = req.body.username;
    Repo.find({'owner.login': username })
        .then((repos) => {
            if (repos.length !== 0) {
                console.log('fromDB');
                res.json(repos);
            } else {
                axios.get(`${API_BASE_URL}/${username}/repos`, {
                    headers: {
                        "Content-Type" : "application/vnd.github.v3+json",
                        "Authorization" : `token ${configVars.TOKEN}`
                    }
                })
                    .then((result) => {
                        if (result.data.length !== 0){
                            console.log('here');
                            return result.data;
                        } else {
                            res.status(400).json('empty');
                        }
                    })
                    .then((resultData) => {
                        Repo.insertMany(resultData)
                            .then((docs) => {
                                res.status(201).json(docs);
                            })
                            .catch((err) => {
                                res.status(400).json(err);
                            })
                    })
                    .catch((err) => {
                        res.status(err.response.status).json(err);
                    })
            }
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

app.get('/repos', cors(), function (req, res) {
  Repo.find()
      .sort({createdAt: -1})
      .limit(25)
      .then(repoData => {
        res.status(200).json(repoData);
      })
      .catch(err => {
        res.status(400).json(err);
      })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
