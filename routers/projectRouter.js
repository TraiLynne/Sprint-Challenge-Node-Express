const express = require('express');

const router = express.Router();

router.use(express.json())

// C - Create
router.post('/', (req, res) => {
    res
        .status(201)
        .json({
            operation: 'POST',
            url: '/api/projects/'
        });
});

// R - Read
router.get('/', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'GET',
            url: '/api/projects/'
        });
});

router.get('/:id', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'GET',
            url: '/api/projects/:id'
        });
});

// U - Update
router.put('/:id', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'PUT',
            url: '/api/projects/:id'
        });
});

// D - Destroy
router.delete('/:id', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'DELETE',
            url: '/api/projects/:id'
        });
});

router.use('/', (req, res) => res.send('Welcome to the Project API'));

module.exports = router;