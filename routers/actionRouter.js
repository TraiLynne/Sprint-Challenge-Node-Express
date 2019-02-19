const express = require('express');

const router = express.Router();

router.use('/', (req, res) => res.send('Welcome to the Action API'));

module.exports = router;