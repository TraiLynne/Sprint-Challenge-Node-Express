const express = require('express');
const helmet = require('helmet');

const server = express();
const port = 4000;

const mainRouter = require('./routers');

// Middleware
server.use(helmet());


// Main Router
server.use('/api', mainRouter)

server.use('/', (req, res) => res.send('It\'s working !! \nIt\'s working'));


// Listener
server.listen(port, () => console.log(`Server listening on port: ${port}`));