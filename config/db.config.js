const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection string
const mongoURI = process.env.MONGOURI;

// Creates a connection to the MongoDB database
mongoose.connect(mongoURI);

// Get the default connection
const db = mongoose.connection;

// Event handlers for database connection
db.on("connected", () => {
  console.log(`Sucessfully Connected to Database`);
});

db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on("disconnected", () => {
  console.log("MongoDB connection disconnected");
});

// Handle application termination
process.on("SIGINT", () => {
  db.close(() => {
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  });
});

module.exports = db;
