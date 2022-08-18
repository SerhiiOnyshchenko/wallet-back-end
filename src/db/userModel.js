const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName required"],
    },
    balans: Number,
  },
  { versionKey: false }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
