const { Schema, model } = require("mongoose");

const seatSchema = new Schema(
  {
    x: Number,
    y: Number,
    type: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Seat", seatSchema);
