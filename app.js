require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
const mongoDatabase = process.env.MONGODB_DATABASE || "Phase-6";

function createApp({ routePath, routes, routeMounts = [], homePage }) {
  const app = express();
  const publicDir = path.join(__dirname, "public");
  const pagePath = path.join(publicDir, homePage);

  app.use(cors());
  app.use(express.json());
  app.get("/", (req, res) => {
    res.sendFile(pagePath);
  });
  app.use(express.static(publicDir));
  if (routePath && routes) {
    app.use(routePath, routes);
  }
  for (const { path: mountPath, router } of routeMounts) {
    app.use(mountPath, router);
  }

  return app;
}

async function connectDatabase() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(mongoUri, { dbName: mongoDatabase });
  console.log(`MongoDB connected to ${mongoDatabase}`);
}

module.exports = { createApp, connectDatabase };
