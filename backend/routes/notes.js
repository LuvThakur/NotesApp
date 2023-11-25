const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');

// Fetch all notes Get : /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const noteData = await Note.find({ user: req.user.id });

        res.json(noteData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new note Post : /api/notes/addnotes
router.post('/addnotes', fetchuser, [
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    body('description').isLength({ min: 4 }).withMessage('Description must be at least 4 characters')
], async (req, res) => {
    const { title, description } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Note({ title, description, user: req.user.id });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// update an note PUT : /api/notes/updatenote 

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    // its an object (newNote)
    const newNote = {};

    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    // for update note u need to id 

    let note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(404).send("Not Found");
        // console.log(error.message);
    }

    //    check the user who are trying to update an Note
    if (note.user.toString() !== req.user.id) {
        // console.log(error.message);
        return res.status(401).send("Unauthorize");
    }

    try {
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete request
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Check if the note exists
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Check if the user is authorized to delete the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized");
        }

        // Delete the note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Message": "Successfully Note Deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;
