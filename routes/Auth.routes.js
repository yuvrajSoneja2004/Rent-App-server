// Import necessary modules and dependencies
const express = require("express");
const router = express.Router();

// Import controllers for routes
const { registerController } = require("../controllers/Auth.controller");

// ? Define route handlers
// Route for creating a new user account in the database
router.post("/register", registerController);

// Export the router to make it available for use in other parts of the application
module.exports = router;
