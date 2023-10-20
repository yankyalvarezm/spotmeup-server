var express = require("express");
var router = express.Router();

const Venue = require("../models/Venue");
const Layout = require("../models/Layout");

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

module.exports = router;
