var express = require("express");
var router = express.Router();

const Venue = require("../models/Venue");
const Layout = require("../models/Layout");

/* GET home page. */
router.post("/create", (req, res, next) => {
  Venue.create(req.body)
    .then((createdVenue) => {
      res.json(createdVenue);
    })
    .catch((err) => {
      console.log("Line 15 - Error:", err);
    });
});

router.post("/addlayout/:venueId", async (req, res) => {
  const { venueId } = req.params;
  const { layout } = req.body;
  try {
    const venue = await Venue.findById(venueId);
    layout.forEach(async (current) => {
      if (venue.layout.includes(current)) {
        return
      }
      await Venue.findByIdAndUpdate(
      venueId,
      { $push: { layout: current } },
      { new: true }
    );

    });
    console.log("hello")
    
    res.status(201).json({msg: "Layout updated succesfully"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error adding layout" + error });
  }
});

module.exports = router;
