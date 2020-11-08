const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const models = require('../models');

router.get("/", async function (req, res) {
    try {
        const ayudas = await models.Help.findAll();
        res.send(ayudas);
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

router.get("/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const ayuda = await models.Help.find({ where: { id: id } });
        res.send(ayuda);
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

router.post("/create", async function (req, res) {
    try {

        const { token } = req.headers;
        const {
            title,
            number,
            link,
        } = req.body;

        await jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' });

        const newAyuda = await models.Help.create({
            title: title,
            number: number,
            link: link
        });

        await newHelp.save();
        res.send({ message: "Help has been created!", help: newAyuda });
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
            number,
            link,
        } = req.body;


        await jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' });
        const ayuda = await models.Help.find({ where: { id: id } });
        ayuda.title = title;
        ayuda.number = number;
        ayuda.link = link;
        await ayuda.save();
        res.send({ message: "Help has been updated!", ayuda: ayuda });
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

router.delete("/delete/:id", async function (req, res) {
    try {
        const { token } = req.headers;
        const { id } = req.params;
        await jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' });
        const ayuda = await models.Help.find({ where: { id: id } });
        await ayuda.remove();
        res.send({ message: "Help has been deleted!" });
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

module.exports = router;