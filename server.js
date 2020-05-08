const express = require('express');
const server = express();
const projectsRouter = require('./projectsRouter');


server.use(express.json());

server.get('/', (req, res) => {
    res.json("server up an running");
})

server.use('/api/projects', projectsRouter)
module.exports = server;