const express = require('express');
const router = express.Router();
const restrict = require("./restrict");
const repository = require('../repos');

// http://localhost:8080/actividades/
router.get("/", async function (req, res) {
    try {
        // const query = req.query;
        // const { limit } = req.headers;
        const events = await repository.events.get();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// http://localhost:8080/actividades/654
router.get("/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const event = await repository.events.getById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post("/create", restrict, async function (req, res) {
    try {
        const { event } = req.body;
        console.log(event)
        const newEvent = await repository.events.add(event);
        res.status(201).json({ 
            message: "Event has been created!", 
            newEvent 
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
        const { event } = req.body;
        const updatedEvent = await repository.events.update(id, event);
        res.status(200).json({ 
            message: "Event has been updated!", 
            updatedEvent 
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
        const removedEvent = await repository.events.remove(id);
        res.status(200).json({ 
            message: "Event has been deleted!",
            removedEvent
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;