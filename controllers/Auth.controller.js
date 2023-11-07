const useDetect = require("../utils/useDetect");
const Users = require("../models/User.model");

const registerController = async (req, res) => {
  try {
    // Check if the request body is undefined
    if (req.body === undefined) {
      console.log("Request body is not fulfilled");
      // Send a 406 status code and a JSON response indicating an error
      res.status(406).json({
        res: false,
        msg: "Request body is not fulfilled",
      });
    } else {
      // Extract relevant data from the request body
      const { name, email, password } = req.body;
      // Create a new User instance with extracted data
      const newUser = new Users({
        username: name,
        useremail: email,
        userpassword: password,
      });

      // Save the new user in the database
      const isUserSaved = await newUser.save();

      if (isUserSaved) {
        // Send a 201 status code and a JSON response indicating a successful user creation
        res.status(201).json({
          res: true,
          msg: "Successfully created a new user",
        });
      }
    }
  } catch (error) {
    // Detect the cause of the error using the utility method
    const errCause = useDetect(error);

    if (errCause === "duplicate") {
      // Send a JSON response indicating that a duplicate username or email already exists
      res.json({
        res: false,
        msg: "Username or email already exists",
      });
    } else {
      res.json({
        msg: errCause,
      });
    }
  }
};

module.exports = { registerController };
