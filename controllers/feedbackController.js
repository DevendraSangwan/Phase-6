const mongoose = require("mongoose");
const Feedback = require("../models/Feedback");

async function createFeedback(req, res) {
  try {
    const feedback = await Feedback.create({
      name: req.body.name,
      rating: req.body.rating,
      comment: req.body.comment
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getFeedback(req, res) {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
}

async function updateFeedback(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid feedback id" });
  }

  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        rating: req.body.rating,
        comment: req.body.comment
      },
      { new: true, runValidators: true }
    );

    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteAllFeedback(req, res) {
  try {
    await Feedback.deleteMany({});
    res.json({ message: "All feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete feedback" });
  }
}

module.exports = {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteAllFeedback
};
