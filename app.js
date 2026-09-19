require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

function createApp({ routePath, routes, homePage }) {
  const app = express();
  const publicDir = path.join(__dirname, "public");
  const pagePath = path.join(publicDir, homePage);

  app.use(cors());
  app.use(express.json());
  app.get("/", (req, res) => {
    res.sendFile(pagePath);
  });
  app.use(express.static(publicDir));
  app.use(routePath, routes);

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
