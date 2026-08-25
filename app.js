require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/feedback", feedbackRoutes);

async function connectDatabase() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

module.exports = { app, connectDatabase };
