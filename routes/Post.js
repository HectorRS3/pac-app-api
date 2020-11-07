const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

// http://localhost:8080/posts/
router.get("/", async function (req, res) {
    try {
        // const { token } = req.headers;
        // await jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' });
        // const {filter} = req.headers;
        const posts = await Post.findAll();
        res.send(posts);
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

// http://localhost:8080/posts/654
router.get("/:id", async function (req, res) {
    try {
        // const { token } = req.headers;
        const { id } = req.params;
        // await jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' });
        const post = await Post.find({ where: { id: id } });
        res.send(post);
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

router.post("/create", async function (req, res) {
    try {
        const { token } = req.headers;
        const {
            title,
            author,
            summary,
            body,
            link,
            tags,
            category
        } = req.body;

        await jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' });
        const newPost = new Post({
            title: title,
            author: author,
            summary: summary,
            body: body,
            link: link,
            tags: tags,
            category: category
        });

        await newPost.save();
        res.send({ message: "Post has been created!", post: newPost });
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

router.put("/update/:id", async function (req, res) {
    try {
        const { token } = req.headers;
        const { id } = req.params;
        const {
            title,
            author,
            summary,
            body,
            link,
            tags,
            category
        } = req.body;

        await jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' });
        const post = Post.find({ where: { id: id } });
        post.title = title;
        post.author = author;
        post.summary = summary;
        post.body = body;
        post.link = link;
        post.tags = tags;
        post.category = category;
        await post.save();
        res.send({ message: "Post has been updated!", post: post });
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

router.delete("/delete/:id", async function (req, res) {
    try {
        const { token } = req.headers;
        const { id } = req.params;
        await jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' });
        const post = post.find({ where: { id: id } });
        await post.remove();
        res.send({ message: "Post has been deleted!" });
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

module.exports = router;