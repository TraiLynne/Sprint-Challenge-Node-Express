const express = require('express');

const router = express.Router();

// Sub-Routers
const actionRouter = require('./actionRouter');
const projectRouter = require('./projectRouter');

router.use('/actions', actionRouter)
router.use('/projects', projectRouter);

router.use('/', (req, res) => res.send('Welcome to the main API'));

module.exports = router;