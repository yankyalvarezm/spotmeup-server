const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    name: String,
    date: Date,
    venue: {type: Schema.Types.ObjectId, ref: 'Venue'},
    guests: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", eventSchema);
