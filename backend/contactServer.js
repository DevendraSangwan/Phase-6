require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("../models/Contact");

const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Contact DB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

app.post("http://localhost:4001/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.json({ message: "Contact submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit contact" });
  }
});

app.get("http://localhost:4001/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

app.delete("http://localhost:4001/api/contact", async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: "All Contacts deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Contacts" });
  }
});

app.put("http://localhost:4001/api/contact/:id", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Contact.findByIdAndUpdate(req.params.id, { name, email, message });
    res.json({ message: "Contact updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact" });
  }
});

app.listen(PORT, () => {
  console.log(`Contact Server running on http://localhost:${PORT}`);
});
