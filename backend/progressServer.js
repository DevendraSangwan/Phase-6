require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Progress = require("../models/Progress");

const app = express();
const PORT = 4002;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Progress DB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

  //CREATE
app.post("/api/progress", async (req, res) => {
  try {
    const { studentName, courseName, completionPercentage } = req.body;
    const newProgress = new Progress({ studentName, courseName, completionPercentage });
    await newProgress.save();
    res.json({ message: "Progress submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit progress" });
  }
});

//READ
app.get("/api/progress", async (req, res) => {
  try {
    const progressData = await Progress.find();
    res.json(progressData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

//DELETE ALL
app.delete("/api/progress", async (req, res) => {
  try {
    await Progress.deleteMany({});
    res.json({ message: "All Progress deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Progress" });
  }
});

//PUT
app.put("/api/progress/:id", async (req, res) => {
  try {
    const { studentName, courseName, completionPercentage } = req.body;
    await Progress.findByIdAndUpdate(req.params.id, { studentName, courseName, completionPercentage });
    res.json({ message: "Progress updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" });
  }
});

app.listen(PORT, () => {
  console.log(`Progress Server running on http://localhost:${PORT}`);
});
