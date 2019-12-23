const express = require('express');
const axios = require('axios');
const Repo = require('../database/index');
const configVars = require('../config');
const API_BASE_URL = 'https://api.github.com/users';
var getReposByUsername = require('../helpers/github');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies


app.post('/repos', function (req, res) {
    console.log(req.body.username);
    const username = req.body.username;
    Repo.find({'owner.login': username })
        .then((repos) => {
            if (repos.length !== 0) {
                console.log('fromDB');
                res.json(repos)
            } else {
                axios.get(`${API_BASE_URL}/${username}/repos`, {
                    headers: {
                        "Content-Type" : "application/vnd.github.v3+json",
                        "Authorization" : `token ${configVars.TOKEN}`
                    }
                })
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
            }
        })
        .catch((err) => {
            res.status(400).json(err)
        });
   // const repo = new Repo(req.body);
   // repo.save()
   //     .then(repoData => {
   //       res.status(201).json(repoData);
   //     })
   //     .catch(err => {
   //       res.status(400).json(err)
   //     })
});

app.get('/repos', function (req, res) {
  Repo.find()
      .then(repoData => {
        res.status(200).json(repoData);
      })
      .catch(err => {
        res.status(400).json(err)
      })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

