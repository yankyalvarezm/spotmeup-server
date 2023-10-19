const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    price: Number,
    seatnumber: Number,
    seatrow: String,
    seatsection: String,
    table: Boolean,
    tablenumber: Number,
    category: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Ticket", ticketSchema);
