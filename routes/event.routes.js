var express = require("express");
var router = express.Router();

const Event = require("../models/Event");
const Venue = require("../models/Venue");

// --------------- Add Events -------------

router.post("/create", async (req, res, next) => {
  try {
    const allEvents = await Event.find({});
    const eventExist = allEvents.some((event) => event.name === req.body.name);
    if (!eventExist) {
      const thisVenue = await Venue.findById(req.body.venue);
      console.log("thisVenue:", thisVenue);
      const createdEvent = await Event.create({
        ...req.body,
        guests: thisVenue.capacity,
      });
      res.json(createdEvent);
    } else {
      res.status(400).json({ message: "Event Name Taken" });
    }

    console.log("Line 34 - All Events:", allEvents);
  } catch (err) {
    console.log("Line 25 - Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// --------------- Delete Events -------------

router.delete("/delete/:eventId", async (req, res, next) => {
  try {
    const { eventId } = req.params;

    await Event.findByIdAndDelete(eventId);

    const updatedEvents = await Event.find({});

    res.json(updatedEvents);

    console.log("Line 35 - Deleted Event:", eventId);
  } catch (err) {
    console.log("Line 15 - Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// --------------- Edit Events -------------

router.put("/edit/:eventId", async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const updatedData = req.body;

    await Event.findByIdAndUpdate(eventId, updatedData, { new: true });

    const updatedEvents = await Event.find({});
    res.json(updatedEvents);

    console.log("Line 59 - Edited Event:", eventId);
  } catch (err) {
    console.log("Line 63 - Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
