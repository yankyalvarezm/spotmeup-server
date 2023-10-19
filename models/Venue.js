const { Schema, model } = require("mongoose");

const venueSchema = new Schema(
  {
    name: String,
    address: String,
    owner: String,
    capacity: Number,
    layout: [{ type: Schema.Types.ObjectId, ref: "Layout" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Venue", venueSchema);
