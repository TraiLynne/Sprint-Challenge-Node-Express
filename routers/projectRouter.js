const express = require('express');

const router = express.Router();
const db = require('../data/helpers/projectModel');

router.use(express.json())

// C - Create
router.post('/', async (req, res) => {
    const newRecord = req.body;

    try {
        if (!newRecord.name || newRecord.name === '') {
            res
                .status(400)
                .json({
                    errorMessage: 'Please provide a name for the new record'
                });
        } else if (!newRecord.description || newRecord.description === '') {
            res
                .status(400)
                .json({
                    errorMessage: 'Please provide a description for the new record'
                });
        } else if (!newRecord.completed) {
            newRecord.completed = false;

            const newProject = await db.insert(newRecord);

            newProject ?
                res
                    .status(201)
                    .json(newProject)
                :
                res
                    .status(500)
                    .json({
                        errorMessage: 'There was an error processing your request'
                    });
        } else {
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
        const allRecords = await db.get();

        allRecords.length > 0 ?
            res
                .status(200)
                .json(allRecords)
            :
            res
                .status(404)
                .json({
                    errorMessage: 'There are no Projects found'
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
    const { id } = req.params;
    let record = null;

    try {
        record = await db.get(id);

        record ?
            res
                .status(200)
                .json(record)
            :
            res
                .status(404)
                .json({
                    errorMessage: 'There was no project found'
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

router.get('/:id/actions', async (req, res) => {
    const { id } = req.params;
    let project = null;

    try {
        project = await db.get(id);
        let actions = await db.getProjectActions(id);

        project ?
            actions.length > 0 ?
                res
                    .status(200)
                    .json(actions)
                :
                res
                    .status(404)
                    .json({
                        errorMessage: 'There were no actions found for this post'
                    })
            :
            res
                .status(404)
                .json({
                    errorMessage: 'There was no project located'
                });
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston, we have a problem'
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
                .json(updatedRecord)
            :
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
    const { id } = req.params;

    try {
        const deleted = await db.remove(id);

        deleted ?
            res
                .status(200)
                .json({
                    deleted
                })
            :
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

router.use('/', (req, res) => res.send('Welcome to the Project API'));

module.exports = router;