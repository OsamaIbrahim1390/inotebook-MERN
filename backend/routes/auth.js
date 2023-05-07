const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, query, validationResult } = require('express-validator');

//Create a User using POST "/api/auth/createUser" i.e No Login required
router.post('/createuser', [
    body('email', "Enter a valid email").isEmail(),
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('password', "Password must contatin minimum 5 characters").isLength({ min: 5 }),

], async (req, res) => {
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Check whether the user with the same email exists already   
try {
     let user = await User.findOne({ email:req.body.email })
    if (user) {
        return res.status(400).json({ error: "sorry  a user with this email already exists!!"})
    }

    user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    })
    res.json({"Status":"Ok"})
} catch (error) {
console.error(error.message)   
res.status(500).send("Some error occured");
}})

module.exports = router