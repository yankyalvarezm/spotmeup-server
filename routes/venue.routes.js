var express = require("express");
var router = express.Router();

const Venue = require("../models/Venue");
const Layout = require("../models/Layout");

// --------------- Create Venue -------------

router.post("/create", async (req, res, next) => {
  try {
    const { name, address, owner, capacity, layout } = req.body;

    if (!name || !address || !owner || !capacity) {
      return res.json({ success: false, msg: "Missing Fields" });
    }

    const existingVenue = await Venue.findOne({ name });
    if (existingVenue) {
      return res.json({
        success: false,
        msg: "Venue con ese nombre ya existe.",
      });
    }

    const createdVenue = await Venue.create(req.body);
    res.json({ success: true, venue: createdVenue });
  } catch (err) {
    console.log("Error:", err);
    res.json({ success: false, msg: "Error al crear el venue." });
  }
});

// --------------- Delete Venue -------------

router.delete("/delete/:venueId", async (req, res, next) => {
  try {
    const { venueId } = req.params;

    await Venue.findByIdAndDelete(venueId);

    const updatedVenues = await Venue.find({});

    res.json(updatedVenues);

    console.log("Line 44 - Deleted Venue:", venueId);
  } catch (err) {
    console.log("Line 45 - Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// --------------- Add Layout -------------

router.post("/addlayout/:venueId", async (req, res) => {
  const { venueId } = req.params;
  const { layout } = req.body;
  try {
    const venue = await Venue.findById(venueId);
    layout.forEach(async (current) => {
      if (venue.layout.includes(current)) {
        return;
      }
      await Venue.findByIdAndUpdate(
        venueId,
        { $push: { layout: current } },
        { new: true }
      );
    });
    console.log("hello");

    res.status(201).json({ msg: "Layout updated succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error adding layout" + error });
  }
});

// --------------- Find All Venues -------------

router.get("/allvenues", async (req, res, next) => {
  try {
    const existVenue = await Venue.find();
    if (existVenue && existVenue.length > 0) {
      res.json({ success: true, venue: existVenue });
    } else {
      res.json({ success: false, msg: "No venues found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error loading venues" + error });
  }
});

// --------------- Find Venue by Id -------------

router.get("/allvenues/:venueId", async (req, res, next) => {
  const { venueId } = req.params;

  try {
    const existVenue = await Venue.findById(venueId);
    if (existVenue) {
      res.json({ success: true, venue: existVenue });
    } else {
      res.json({ success: false, msg: "Venue not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error loading venues" + error });
  }
});

// --------------- Edit Venue -------------

router.put("/edit/:venueId", async (req, res, next) => {
  try {
    const { venueId } = req.params;
    const updatedData = req.body;

    await Venue.findByIdAndUpdate(venueId, updatedData, { new: true });

    const updatedVenues = await Venue.findById(venueId);
    res.json(updatedVenues);

    console.log("Line 124 - Edited Venue:", venueId);
  } catch (err) {
    console.log("Line 126 - Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
