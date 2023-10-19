const { Schema, model } = require("mongoose");

const layoutSchema = new Schema(
  {
    name: String,
    seats: [{type: Schema.Types.ObjectId, ref: "Seats"}],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Layout", layoutSchema);