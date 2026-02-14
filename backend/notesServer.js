require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Notes = require("../models/Notes");

const app = express();
const PORT = 4003;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Notes DB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

  //CREATE
app.post("/api/notes", async (req, res) => {
  try {
    const { title, content, createAt } = req.body;
    const newNotes = new Notes({ title, content, createAt });
    await newNotes.save();
    res.json({ message: "Notes submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit notes" });
  }
});

//READ
app.get("/api/notes", async (req, res) => {
  try {
    const notesData = await Notes.find();
    res.json(notesData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

//DELETE
app.delete("/api/notes", async (req, res) => {
  try {
    await Notes.deleteMany({});
    res.json({ message: "All Notes deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Notes" });
  }
});

//PUT
app.put("/api/notes/:id", async (req, res) => {
  try {
    const { title, content, createAt } = req.body;
    await Notes.findByIdAndUpdate(req.params.id, { title, content, createAt });
    res.json({ message: "Notes updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update Notes" });
  }
});

app.listen(PORT, () => {
  console.log(`Notes Server running on http://localhost:${PORT}`);
});
