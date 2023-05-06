const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body,query, validationResult } = require('express-validator');

//Create a User using POST "/api/auth/" i.e Doesn't required Auth
router.post('/',[
    body('email',"Enter a valid email").isEmail(), 
    body('name',"Enter a valid name").isLength({min:3}),
    body('password',"Password must contatin minimum 5 characters").isLength({min:5}),

], (req, res) => {
    //validation code to be entered
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
}).then(user=>res.json(user))
.catch(err=>{console.log(err)
res.json({error:'Please Enter A Unique Value'})})
})

module.exports = router