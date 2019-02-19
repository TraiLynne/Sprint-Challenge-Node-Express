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
router.get('/', async (req, res) => {
    try {
        const records = db.get();

        records ?
            res
                .status(200)
                .json(records)
            :
            res
                .status(404)
                .json({
                    errorMessage: 'There are no actions to be found'
                });
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem'
            });
    }
});

router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    let record = null;

    try {
        record = await db.get(id);

        record ?
            res
            .status(200)
            .json(record) :
            res
            .status(404)
            .json({
                errorMessage: 'There was no action found'
            });
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem',
                error: err
            });
    }
});

// U - Update
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        let updatedRecord = await db.update(id, updates);

        updatedRecord ?
            res
            .status(200)
            .json(updatedRecord) :
            res
            .status(404)
            .json({
                errorMessage: 'Updates can only be applied to an existing record'
            })
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem'
            });
    }
});

// D - Destroy
router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const deleted = await db.remove(id);

        deleted ?
            res
            .status(200)
            .json({
                deleted
            }) :
            res
            .status(500)
            .json({
                errorMessage: 'There was an error processing your request'
            });
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem'
            });
    }
});

router.use('/', (req, res) => res.send('Welcome to the Action API'));

module.exports = router;