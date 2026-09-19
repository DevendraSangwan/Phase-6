const mongoose = require("mongoose");
const Notes = require("../models/Notes");

async function createNote(req, res) {
  try {
    const note = await Notes.create(req.body);
    res.status(201).json({ message: "Notes submitted successfully!", note });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getNotes(req, res) {
  try {
    res.json(await Notes.find().sort({ createAt: -1 }));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
}

async function updateNote(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid note id" });
  }

  try {
    const note = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Notes updated successfully!", note });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteNote(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid note id" });
  }

  try {
    const note = await Notes.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully", note });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
}

async function deleteNotes(req, res) {
  try {
    await Notes.deleteMany({});
    res.json({ message: "All Notes deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Notes" });
  }
}

module.exports = { createNote, getNotes, updateNote, deleteNote, deleteNotes };
