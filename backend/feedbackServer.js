require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Feedback = require("../models/Feedback");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Feedback DB Connected"))
  .catch(err => console.error("MongoDB Error:", err));


// CREATE
app.post("/api/feedback", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    const newFeedback = new Feedback({ name, rating, comment });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

// READ
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

// DELETE ALL
app.delete("/api/feedback", async (req, res) => {
  try {
    await Feedback.deleteMany({});
    res.json({ message: "All feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete feedback" });
  }
});

// UPDATE
app.put("/api/feedback/:id", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    await Feedback.findByIdAndUpdate(req.params.id, { name, rating, comment });
    res.json({ message: "Feedback updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update feedback" });
  }
});

app.listen(PORT, () => {
  console.log(`Feedback Server running on http://localhost:${PORT}`);
});
