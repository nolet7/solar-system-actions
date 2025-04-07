require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/solar-system';

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
  mongoOptions.user = process.env.MONGO_USERNAME;
  mongoOptions.pass = process.env.MONGO_PASSWORD;
}

mongoose.connect(MONGO_URI, mongoOptions)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    return seedData();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

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

async function seedData() {
  try {
    await Planet.deleteMany({}); // Clear existing

    await Planet.insertMany([
      { id: 0, name: "Mercury", description: "Closest planet to the Sun", image: "", velocity: "47.9 km/s", distance: "57.9 million km" },
      { id: 1, name: "Venus", description: "Second planet", image: "", velocity: "35.0 km/s", distance: "108.2 million km" },
      { id: 2, name: "Earth", description: "Our home", image: "", velocity: "29.8 km/s", distance: "149.6 million km" },
      { id: 3, name: "Mars", description: "The Red Planet", image: "", velocity: "24.1 km/s", distance: "227.9 million km" },
      { id: 4, name: "Jupiter", description: "Gas giant", image: "", velocity: "13.1 km/s", distance: "778.5 million km" },
      { id: 5, name: "Saturn", description: "Has rings", image: "", velocity: "9.7 km/s", distance: "1.43 billion km" },
      { id: 6, name: "Uranus", description: "Ice giant", image: "", velocity: "6.8 km/s", distance: "2.87 billion km" },
      { id: 7, name: "Neptune", description: "Furthest planet", image: "", velocity: "5.4 km/s", distance: "4.5 billion km" },
      { id: 8, name: "Pluto", description: "Dwarf planet", image: "", velocity: "4.7 km/s", distance: "5.9 billion km" },
      { id: 9, name: "Sun", description: "Our star", image: "", velocity: "0", distance: "0" }
    ]);

    console.log("🌍 Planet data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
}
