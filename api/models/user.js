const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    role: {
      type: String,
      required: false,
      enum: ["admin", "user"],
      default: "user",
    },
    password: { type: String, required: true },
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", userSchema);
