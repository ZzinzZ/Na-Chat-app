const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 1024,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
