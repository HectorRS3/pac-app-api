const express = require('express');
const router = express.Router();
const restrict = require("./restrict");
const repository = require('../repos');

router.get("/", async function (req, res) {
    try {
        // const query = req.query;
        // const { limit } = req.headers;
        const helpList = await repository.help.get();
        res.status(200).json(helpList);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const help = await repository.help.getById(id);
        res.status(200).json(help);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post("/create", restrict, async function (req, res) {
    try {
        const help = req.body;
        const newHelp = await repository.help.add(help);
        res.status(201).json({ 
            message: "Help has been created!", 
            newHelp 
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
        const help = req.body;
        const updatedHelp = await repository.help.update(id, help);
        res.status(200).json({ 
            message: "Help has been updated!", 
            updatedHelp
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
        const removedHelp = await repository.help.remove(id);
        res.send({ 
            message: "Help has been deleted!",
            removedHelp
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;