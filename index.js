const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const { Octokit } = require("@octokit/core");

//configuration vars
const ghToken = process.env['token']
const owner = `Oren-Lindsey`
const defaultChart = `login`

const octokit = new Octokit({ auth: ghToken });

app.get('/api/views/:repo', (req, res) => {
  const repo = req.params['repo'];
  octokit.request('GET /repos/{owner}/{repo}/traffic/views', {
    owner: owner,
    repo: repo
  })
    .then(viewsData => {
      res.send(viewsData.data)
    })
    .catch(function(err){
      if (err.response.hasOwnProperty('data')) {
        res.status(err.status).send({'error': err.response.data.message})
      } else {
        res.status(500).send({'error': err})
      }
    })
})
app.get('/api/views/:repo/shields', (req, res) => {
  const repo = req.params['repo'];
  octokit.request('GET /repos/{owner}/{repo}/traffic/views', {
    owner: owner,
    repo: repo
  })
    .then(viewsData => {
      const shieldsRes = {}
      shieldsRes.schemaVersion = 1;
      shieldsRes.label = `Github Views`;
      shieldsRes.message = `${viewsData.data.count}`
      res.send(shieldsRes)
    })
    .catch(function(err){
      if (err.response.hasOwnProperty('data')) {
        res.status(err.status).send({'error': err.response.data.message})
      } else {
        res.status(500).send({'error': err})
      }
    })
})
app.get('/api/default', (req, res) => {
  res.send({'default': defaultChart})
})

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
})
app.listen(port, () => {
  console.log(`listening`)
})
