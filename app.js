require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

function createApp({ routePath, routes, homePage }) {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(routePath, routes);
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", homePage));
  });

  return app;
}

async function connectDatabase() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}

module.exports = { createApp, connectDatabase };
