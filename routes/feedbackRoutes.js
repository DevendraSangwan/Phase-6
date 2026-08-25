const express = require("express");
const {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteAllFeedback
} = require("../controllers/feedbackController");

const router = express.Router();

router.route("/")
  .post(createFeedback)
  .get(getFeedback)
  .delete(deleteAllFeedback);

router.put("/:id", updateFeedback);

module.exports = router;
