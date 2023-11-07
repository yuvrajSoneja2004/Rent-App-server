const useDetect = require("../utils/useDetect");
const Users = require("../models/User.model");
const bcrypt = require("bcrypt");

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

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

      // Create a new User instance with hashed password
      const newUser = new Users({
        username: name,
        useremail: email,
        userpassword: hashedPassword, // Store the hashed password in the database
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

const loginController = async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check if user exists in the mock database
  const user = await Users.findOne({ username: username });

  if (!user) {
    return res.status(401).json({ message: "Invalid username or Password 1" });
  }

  // Check if the provided password matches the stored password
  if (user.userpassword !== password) {
    return res.status(401).json({ message: "Invalid username or password 2" });
  }

  // Successful login
  res.status(200).json({ message: "Login successful", user: user.username });
};
module.exports = { registerController, loginController };
