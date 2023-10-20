const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: String,
    password: String,
    name: String,
    phone: Number,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);