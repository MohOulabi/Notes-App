const express = require('express');
const router = new express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const User = require('../src/models/user');

router.post('/users', upload.single('file'), async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.send(user);

    } catch (e) {
        res.status(500).send(e.message);
    }
});
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);

    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send(user);

    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;
