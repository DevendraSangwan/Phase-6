const express = require("express");
const controller = require("../controllers/notesController");

const router = express.Router();
router.route("/").post(controller.createNote).get(controller.getNotes).delete(controller.deleteNotes);
router.put("/:id", controller.updateNote);
router.delete("/:id", controller.deleteNote);

module.exports = router;
