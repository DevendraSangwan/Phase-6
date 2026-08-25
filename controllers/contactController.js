const mongoose = require("mongoose");
const Contact = require("../models/Contact");

async function createContact(req, res) {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ message: "Contact submitted successfully!", contact });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getContacts(req, res) {
  try {
    res.json(await Contact.find().sort({ submissionDate: -1 }));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
}

async function updateContact(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid contact id" });
  }

  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json({ message: "Contact updated successfully!", contact });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteContacts(req, res) {
  try {
    await Contact.deleteMany({});
    res.json({ message: "All Contacts deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Contacts" });
  }
}

module.exports = { createContact, getContacts, updateContact, deleteContacts };
