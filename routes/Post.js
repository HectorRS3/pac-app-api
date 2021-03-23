const express = require('express');
const router = express.Router();
const restrict = require('./restrict');
const repository = require('../repos');

router.get("/", async function (req, res) {
    try {
        // const query = req.query;
        // const { limit } = req.headers;
        const posts = await repository.posts.get();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const post = await repository.posts.getById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post("/create", restrict, async function (req, res) {
    try {
        const post = req.body;
        const newPost = await repository.posts.add(post);
        res.status(201).json({ 
            message: "Post has been created!", 
            newPost 
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.put("/update/:id", restrict, async function (req, res) {
    try {
        const { id } = req.params;
        const post = req.body;
        const updatedPost = await repository.posts.update(id, post);
        res.status(200).json({ 
            message: "Post has been updated!", 
            updatedPost 
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.delete("/delete/:id", restrict, async function (req, res) {
    try {
        const { id } = req.params;
        console.log(id);
        const removedPost = await repository.posts.remove(id);
        res.status(200).json({ 
            message: "Post has been deleted!",
            removedPost
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;