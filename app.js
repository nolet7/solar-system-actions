// Load environment variables (.env is optional in production CI/CD)
require('dotenv').config();

const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 🔧 Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// 🔗 MongoDB connection setup using env vars or default local MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/solar-system';
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Optional credentials
if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
  mongoOptions.user = process.env.MONGO_USERNAME;
  mongoOptions.pass = process.env.MONGO_PASSWORD;
}

mongoose.connect(mongoUri, mongoOptions, (err) => {
  if (err) {
    console.error("❌ MongoDB connection error:", err);
  } else {
    console.log("✅ MongoDB Connection Successful");
  }
});

// 📦 Define Mongoose Schema & Model
const dataSchema = new mongoose.Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String
});

const Planet = mongoose.model('planets', dataSchema);

// 🚀 Routes

// POST /planet - Get planet by ID
app.post('/planet', async (req, res) => {
  const planetId = req.body.id;
  if (planetId === undefined) {
    return res.status(400).json({ error: "Planet ID is required in request body." });
  }

  try {
    const planet = await Planet.findOne({ id: planetId });
    if (!planet) {
      return res.status(404).json({ error: "Planet not found. Choose a number from 0 - 9." });
    }
    res.json(planet);
  } catch (error) {
    res.status(500).json({ error: "Server error retrieving planet." });
  }
});

// GET / - Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// GET /os - Return OS and environment info
app.get('/os', (req, res) => {
  res.status(200).json({
    os: OS.hostname(),
    env: process.env.NODE_ENV || "development"
  });
});

// Health check endpoints
app.get('/live', (req, res) => res.status(200).json({ status: "live" }));
app.get('/ready', (req, res) => res.status(200).json({ status: "ready" }));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
