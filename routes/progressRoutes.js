const express = require("express");
const controller = require("../controllers/progressController");

const router = express.Router();
router.route("/").post(controller.createProgress).get(controller.getProgress).delete(controller.deleteProgress);
router.put("/:id", controller.updateProgress);
router.delete("/:id", controller.deleteProgressItem);

module.exports = router;
