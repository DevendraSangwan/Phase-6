const mongoose = require("mongoose");
const Progress = require("../models/Progress");

async function createProgress(req, res) {
  try {
    const progress = await Progress.create(req.body);
    res.status(201).json({ message: "Progress submitted successfully!", progress });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getProgress(req, res) {
  try {
    res.json(await Progress.find().sort({ lastUpdated: -1 }));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
}

async function updateProgress(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid progress id" });
  }

  try {
    const progress = await Progress.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      timestamps: false
    });
    if (!progress) return res.status(404).json({ error: "Progress not found" });
    res.json({ message: "Progress updated successfully!", progress });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteProgressItem(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid progress id" });
  }

  try {
    const progress = await Progress.findByIdAndDelete(req.params.id);
    if (!progress) return res.status(404).json({ error: "Progress not found" });
    res.json({ message: "Progress deleted successfully", progress });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete progress" });
  }
}

async function deleteProgress(req, res) {
  try {
    await Progress.deleteMany({});
    res.json({ message: "All Progress deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete progress" });
  }
}

module.exports = { createProgress, getProgress, updateProgress, deleteProgressItem, deleteProgress };
