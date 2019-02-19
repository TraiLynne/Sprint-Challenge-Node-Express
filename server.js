const express = require('express');
const helmet = require('helmet');

const server = express();
const port = 4000;

server.use(helmet());

server.listen(port, () => console.log(`Server listening on port: ${port}`));