const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Actividades = require('../models/Actividades');

// http://localhost:8080/actividades/
router.get("/", async function (req, res) {
    try {
        const actividades = await Actividades.findAll();
        res.send(actividades);
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

// http://localhost:8080/actividades/654
router.get("/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const actividad = await Actividades.find({ where: { id: id } });
        res.send(actividad);
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

router.post("/create", async function (req, res) {
    try {

        const { token } = req.headers;
        const {
            title,
            organizer,
            date,
            description,
            link,
        } = req.body;

        await jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' });
        const newActivity = new Actividades({
            title: title,
            organizer: organizer,
            date: date,
            description: description,
            link: link
        });

        await newActivity.save();
        res.send({ message: "Activity has been created!", activity: newActivity });
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
            organizer,
            date,
            description,
            link,
        } = req.body;


        await jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' });
        const actividad = await Actividades.find({ where: { id: id } });
        actividad.title = title;
        actividad.organizer = organizer;
        actividad.date = date;
        actividad.description = description;
        actividad.link = link;
        await actividad.save();
        res.send({ message: "Activity has been updated!", actividad: actividad });
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

router.delete("/delete/:id", async function (req, res) {
    try {
        const { token } = req.headers;
        const { id } = req.params;
        await jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' });
        const actividad = await Actividades.find({ where: { id: id } });
        await actividad.remove();
        res.send({ message: "Activity has been deleted!" });
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

module.exports = router;