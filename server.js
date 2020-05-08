const express = require('express');
const server = express();
const projectsRouter = require('./projectsRouter');
const actionsRouter = require('./actionsRouter');


server.use(express.json());

server.get('/', (req, res) => {
    res.json("server up an running");
})

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)
module.exports = server;