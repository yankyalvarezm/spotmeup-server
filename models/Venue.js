const { Schema, model } = require("mongoose");

const venueSchema = new Schema(
  {
    name: String,
    address: String,
    state: String,
    city: String,
    zipcode: Number,
    owner: String,
    capacity: Number,
    description: String,
    layout: [{ type: Schema.Types.ObjectId, ref: "Layout" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Venue", venueSchema);
