const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const restrict = require('./restrict');
const repository = require('../repos');
const { sign } = require('jsonwebtoken');

router.get("/", restrict, async function(req, res){
    try {
        // const query = req.query;
        // const { limit } = req.headers;
        const users = await repository.user.get();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/:id", restrict, async function(req, res){
    try {
        const { id } = req.params;
        const user = await repository.user.getById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post('/create', restrict, async function (req, res) {
    try {
        const { user } = req.body;
        const newUser = await repository.user.add(user);
        res.status(201).json({
            message: "User created successfully!",
            newUser
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.put("/update/:id", restrict, async function (req, res){
    try {
        const { id } = req.params;
        const { user } = req.body;
        const updatedUser = await repository.user.update(id, user);
        res.status(200).json({
            message: "User has been updated.",
            updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.delete("/delete/:id", restrict, async function(req, res){
    try {
        const { id } = req.params;
        const removedUser = await repository.user.remove(id);
        res.status(200).json({ 
            message: `User ${removedUser} has been removed` 
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post('/login', async function (req, res) {
    try {
        const { username, password } = req.body;

        const user = await repository.user.get(username);

        if(!user) {
            res.status(404).json({
                message: "User not found"
            });
        }

        const pass = await bcrypt.compare(password, user[0].dataValues.password);

        if(!pass) {
            res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = await sign(JSON.stringify(user), process.env.SECRET, { algorithm: 'HS384' });

        res.status(200).json({
            message: "Signed in successfully!",
            token,
            pass
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;