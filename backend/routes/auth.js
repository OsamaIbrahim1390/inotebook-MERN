const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, query, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'JWT_SECRET';

//Route:01 Create a User using POST "/api/auth/createUser" i.e No Login required
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
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "sorry  a user with this email already exists!!" })
        }
        //generated the salt   
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Create a new User
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        //sending the auth token using JWT
        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({ authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})


//Route 2:login user using POST "/api/auth/login" i.e No Login required
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must contatin minimum 5 characters").exists(),

], async (req, res) => {

    //If there are errors return bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        //checking if user is present in DB or Not
        if (!user) {
            return res.status(400).json({ error: "Try to login with correct credentials!!" })
        }
        //comparing the password with the hashed password in db
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Try to login with correct credentials!!" })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        //sending the auth token using JWT
        const authtoken = jwt.sign(payload, JWT_SECRET)
        res.json({ authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
});


//Route 3:Get logged-in user details using POST"/api/auth/getuser" i.e Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId=req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})

module.exports = router