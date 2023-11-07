// Import necessary modules and dependencies
const express = require("express");
const router = express.Router();
const Users = require("../models/User.model");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Import controllers for routes
const {
  registerController,
  loginController,
} = require("../controllers/Auth.controller");

// ? Define route handlers
// Route for creating a new user account in the database
router.post("/register", registerController);
router.post("/login", loginController);

// Export the router to make it available for use in other parts of the application
module.exports = router;
