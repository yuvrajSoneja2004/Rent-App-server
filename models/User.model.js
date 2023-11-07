const { Schema, model } = require("mongoose");

// Defining User schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  useremail: {
    type: String,
    unique: true,
    required: true,
  },
  userpassword: {
    type: String,
    minlength: 6,
    required: true,
  },
  userprofileimg: {
    type: String,
  },

  usernotifications: {
    type: Array,
    default: [],
  },
});

// Creating user model using userSchema
module.exports = model("users", UserSchema);
