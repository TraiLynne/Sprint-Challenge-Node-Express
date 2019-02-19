const express = require('express');

const router = express.Router();
const db = require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel');

router.use(express.json())

// C - Create
router.post('/new/:projectId', async (req, res) => {
    const newRecord = req.body;
    const { projectId } = req.params;

    try {
        const project = await projectDb.get(projectId);

        if (project) {
            
            if (!newRecord.notes || newRecord.notes === '') {
                res
                    .status(400)
                    .json({
                        errorMessage: 'Please provide notes for the new record'
                    });
            } else if (!newRecord.description || newRecord.description === '') {
                res
                    .status(400)
                    .json({
                        errorMessage: 'Please provide a description for the new record'
                    });
            } else if (!newRecord.completed) {
                newRecord.completed = false;
                newRecord.project_id = projectId
    
                const newProject = await db.insert(newRecord);
    
                newProject ?
                    res
                    .status(201)
                    .json(newProject) :
                    res
                    .status(500)
                    .json({
                        errorMessage: 'There was an error processing your request'
                    });
            } else {
                newRecord.project_id = projectId

                const newProject = await db.insert(newRecord);
                
                newProject ?
                    res
                    .status(201)
                    .json(newProject) :
                    res
                    .status(500)
                    .json({
                        errorMessage: 'There was an error processing your request'
                    });
            }
        } else {
            res
                .status(404)
                .json({
                    errorMessage: 'Action must be attached to an existing record'
                });
        }
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem'
            });
    }
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