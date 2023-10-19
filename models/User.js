const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: String,
    password: String,
    name: String,
    phone: Number,
    image: {
      type: String,
      default:
        "https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);