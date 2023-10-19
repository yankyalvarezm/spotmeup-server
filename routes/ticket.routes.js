var express = require("express");
var router = express.Router();

const Ticket = require("../models/Ticket");

// --------------- Add Tickets -------------

router.post("/create", async (req, res, next) => {
  try {
    const { seatnumber, seatrow, seatsection, event } = req.body;

    const existingTicket = await Ticket.findOne({
      seatnumber,
      seatrow,
      seatsection,
      event,
    });

    if (!existingTicket) {
      const createdTicket = await Ticket.create(req.body);
      res.json(createdTicket);
    } else {
      res.status(400).json({ message: "Ticket Already Created" });
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// --------------- Delete Tickets -------------

router.delete("/delete/:ticketId", async (req, res, next) => {
  try {
    const { ticketId } = req.params;

    await Ticket.findByIdAndDelete(ticketId);

    const updatedTickets = await Ticket.find({});

    res.json(updatedTickets);

    console.log("Line 44 - Deleted Ticket:", ticketId);
  } catch (err) {
    console.log("Line 46 - Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// --------------- Edit Tickets -------------

router.put("/edit/:ticketId", async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const updatedData = req.body;

    await Ticket.findByIdAndUpdate(ticketId, updatedData, { new: true });

    const updatedTickets = await Ticket.find({});
    res.json(updatedTickets);

    console.log("Line 62 - Edited Ticket:", ticketId);
  } catch (err) {
    console.log("Line 64 - Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;