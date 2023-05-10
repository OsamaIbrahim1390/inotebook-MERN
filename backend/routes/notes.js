const express = require('express')
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const Note= require('../models/Note');
const { body, query, validationResult } = require('express-validator');



//Route:01 Get all the notes of the logged in user using GET "/api/auth/fetchallnotes" Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})

//Route:02 Addd a new note of the logged in user using POST "/api/auth/addnote" Login required
router.post('/addnote', fetchuser, [
    //performed validation through express validator
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Description must be off at least 5 characters").isLength({ min: 5 }),
]
    , async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            //If there are errors return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title, description, tag, user: req.user.id
            })

            const savedNote = await note.save();
            res.json(savedNote)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error");
        }

    })
module.exports = router