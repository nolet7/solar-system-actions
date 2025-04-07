// Load environment variables from .env file
require('dotenv').config();

const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// MongoDB connection using environment variables
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
  mongoOptions.user = process.env.MONGO_USERNAME;
  mongoOptions.pass = process.env.MONGO_PASSWORD;
}

mongoose.connect(process.env.MONGO_URI, mongoOptions, (err) => {
  if (err) {
    console.error("❌ MongoDB connection error:", err);
  } else {
    console.log("✅ MongoDB Connection Successful");
  }
});

// Schema and Model
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String
});

const Planet = mongoose.model('planets', dataSchema);

// Routes

// POST /planet - Retrieve planet data by ID
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

// GET / - Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// GET /os - Return server hostname and environment
app.get('/os', (req, res) => {
  res.status(200).json({
    os: OS.hostname(),
    env: process.env.NODE_ENV || "development"
  });
});

// Health checks
app.get('/live', (req, res) => res.status(200).json({ status: "live" }));
app.get('/ready', (req, res) => res.status(200).json({ status: "ready" }));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
