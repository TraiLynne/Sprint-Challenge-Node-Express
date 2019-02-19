const express = require('express');

const router = express.Router();

router.use(express.json())

// C - Create
router.post('/', (req, res) => {
    res
        .status(201)
        .json({
            operation: 'POST',
            url: '/api/actions/'
        });
});

// R - Read
router.get('/', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'GET',
            url: '/api/actions/'
        });
});

router.get('/:id', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'GET',
            url: '/api/actions/:id'
        });
});

// U - Update
router.put('/:id', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'PUT',
            url: '/api/actions/:id'
        });
});

// D - Destroy
router.delete('/:id', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'DELETE',
            url: '/api/actions/:id'
        });
});

router.use('/', (req, res) => res.send('Welcome to the Action API'));

module.exports = router;