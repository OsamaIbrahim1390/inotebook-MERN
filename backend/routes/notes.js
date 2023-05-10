const express = require('express')
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const Note = require('../models/Note');
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

//Route:03 update the note of the logged in user using PUT "/api/auth/updatenote" Login required
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //Create a new Note Object
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            //find the note to be updated and update it
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not found")
            }
            if (note.user.toString() != req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(note);

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error");
        }

    })

//Route:04 Delete the note of the logged in user using Delete "/api/auth/deletenote" Login required
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {

        try {
            const { title, description, tag } = req.body;

            //find the note to be deleted and delete it
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not found")
            }
            //Allow deletion only if user owns this note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            note = await Note.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Note has been deleted", note: note });
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Internal server error");
        }

    })

module.exports = router