const express = require("express");
const controller = require("../controllers/contactController");

const router = express.Router();
router.route("/").post(controller.createContact).get(controller.getContacts).delete(controller.deleteContacts);
router.put("/:id", controller.updateContact);

module.exports = router;
