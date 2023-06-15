const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../schema/Notes");
const { body, validationResult } = require("express-validator");

// 1. fetch all notes from database with api id /api/auth/getuser . login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// 2. post all notes in database with POST request api /api/note/addnote
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are error return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        res.status(400).json({ errors: errors.array });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// 3. Update an existing note from PUT request '/api/notes/updatenote' and yes login is required.

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new note object
    const newNote = {};
    //if title is present in req
    if (title) {
      newNote.title = title;
    }
    //same with others
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find a note to be updated and update it.
    let note = await Note.findById(req.params.id);
    // if note is not present
    if (!note) {
      return res.status(404).send("NOT FOUND");
    }
    // if user try to update othets notes
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOT ALLOWED");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    // new : true allows to enter a note in db
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//4. Delete an existing note from DELETE request '/api/notes/deletenote' and yes login is required.

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //    find a node to be deleted.
    let note = await Note.findById(req.params.id);
    // if note is not present
    if (!note) {
      return res.status(404).send("NOT FOUND");
    }
    // allow a deletion only if user owe this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("NOT ALLOWED");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
