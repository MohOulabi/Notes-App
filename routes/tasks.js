const express = require('express');
const router = new express.Router();

const Task = require('../src/models/tasks');

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        task.save();
        res.send(task);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);

    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.patch('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send('Task not found');
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e.message);
    }
});


router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }

        res.send(task);

    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;
