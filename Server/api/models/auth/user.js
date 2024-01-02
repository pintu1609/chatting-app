const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    name: {
      type: String,
      index: true,
    },
    userName: {
      type: String,
      index: true,
    },
    password: {
      type: String,
      required: "Enter password !!",
    },
    email: {
      type: String,
      index: true,
      unique: true,
      required: "Enter email !!",
    },
    image: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
