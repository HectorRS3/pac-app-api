const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get("/", async function(req, res){
    try {
        const {token} = req.headers;
        await jwt.verify(token, process.env.SECRET, {algorithm: 'HS256'})
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        console.error(error.message, error.stack);
    }
    
})

router.get("/:id", async function(req, res){
    try {
        const {token} = req.headers;
        const {id} = req.params;
        await jwt.verify(token, process.env.SECRET, {algorithm: 'HS256'})
        const user = await User.findAll({where: {id: id}});
        res.send(user);
    } catch (error) {
        console.error(error.message, error.stack)
    }
})

router.post('/create', async function (req, res) {
    console.log(req.body);
    try {
        const { firstName, lastName, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({firstName: firstName, lastName: lastName, username: username, password: hashedPassword});
        await newUser.save();
        res.status(201).send({message: "User created successfully!"});
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

router.put("/update/:id", async function (req, res){
    try {
        const {token} = req.headers;
        const {id} = req.params;
        const { firstName, lastName, username } = req.body;
        await jwt.verify(token, process.env.SECRET, {algorithm: 'HS256'})
        const user = await User.findOne({where: {id: id}})
        user.firstName = firstName
        user.lastName = lastName
        user.username = username
        await user.save()
        res.send({ message: "User information has been updated!" })
    } catch (error) {
        console.error(error.message, error.stack)
    }
})

router.delete("/delete/:id", async function(req, res){
    console.log(req.params)
    try {
        const {token} = req.headers;
        const {id} = req.params;
        await jwt.verify(token, process.env.SECRET, {algorithm: 'HS256'})
        await User.destroy({where: {id: id}});
        res.send({ message: `User ${id} has been removed` })
    } catch (error) {
        console.error(error.message, error.stack)
    }
})

router.post('/login', async function (req, res) {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ where: { username: username }});
        bcrypt.compare(password, user.dataValues.password, function(err, pass){
            if(err) console.log(err.message, err.stack);

            if(pass) {
                const token = jwt.sign({username, password, iat: Date.now()}, process.env.SECRET, {algorithm: 'HS256'});
                res.status(200).send({
                    message: "Logged in successfully!",
                    token: token, 
                    pass: pass
                });
            } else {
                res.send({ message: "Invalid username or password.", pass: pass})
            }
        });
    } catch (error) {
        console.error(error.message, error.stack);
    }
})

router.put("/change_password", async function(req, res){
    try {
        const { token } = req.headers
        const {username, currentPassword, newPassword } = req.body
        await jwt.verify(token, process.env.SECRET, { algorithm: 'HS256' })
        const user = await User.findOne({ where: { username: username }})
        bcrypt.compare(currentPassword, user.dataValues.password, async function(error, pass){
            try {
                const newHashedPassword = await bcrypt.hash(newPassword, 10)
                user.password = newHashedPassword
                await user.save()
                res.send({ message: "Password has been updated" })
            } catch(error) {
                console.error(error.message, error.stack)
            }
        })
    } catch (error) {
        console.error(error.message, error.stack)
    }
})

module.exports = router;