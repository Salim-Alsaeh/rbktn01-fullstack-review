const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
    useNewUrlParser: true,
    useCreateIndex: true,
});

let repoSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        login: {
            type: String,
            required: true,
            unique: false
        },
        avatar_url: {
            type: String
        },
        url: {
            type: String
        },
        id: {
            type: Number,
            required: true,
            unique: false
        },
        repos_url: String
    },
    html_url: {
        type: String,
        unique: true
    },
    description: String,
    stargazers_count: Number,
    watchers_count: Number,
    forks_count: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Repo', repoSchema);
