var express = require("express");
var router = express.Router();

const Seat = require("../models/Seat");
const Layout = require("../models/Layout");

// ------------ Seats ------------------
// ------------ Create Seats ------------------

router.post("/seat", async (req, res, next) => {
  try {
    const allSeats = await Seat.find({});
    const seatExists = allSeats.some(
      (seat) => seat.x === req.body.x && seat.y === req.body.y
    );

    if (!seatExists) {
      const createdSeat = await Seat.create(req.body);
      res.json(createdSeat);
    } else {
      res
        .status(400)
        .json({ message: "Seat with these coordinates already exists" });
    }
  } catch (err) {
    console.log("Line 15 - Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ------------ Delete Seats ------------------

router.delete("/seat/delete/:seatId", async (req, res, next) => {
  try {
    const { seatId } = req.params;

    await Seat.findByIdAndDelete(seatId);

    const updatedSeats = await Seat.find({});

    res.json(updatedSeats);

    console.log("Line 35 - Deleted Seat:", seatId);
  } catch (err) {
    console.log("Line 15 - Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ------------ Edit Seats ------------------

router.put("/seat/edit/:seatId", async (req, res, next) => {
  try {
    const { seatId } = req.params;
    const updatedData = req.body;

    await Seat.findByIdAndUpdate(seatId, updatedData, { new: true });

    const updatedSeats = await Seat.find({});
    res.json(updatedSeats);

    console.log("Line 59 - Edited Seat:", seatId);
  } catch (err) {
    console.log("Line 63 - Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ------------ Layouts ------------------
// ------------ Create Layouts ------------------

router.post("/create", async (req, res, next) => {
  try {
    const allLayouts = await Layout.find({});
    const layoutExists = allLayouts.some(
      (layout) => layout.name === req.body.name
    );
    if (!layoutExists) {
      const createdLayout = await Layout.create(req.body);
      res.json(createdLayout);
    } else {
      res.status(400).json({ message: "Layout Name Taken" });
    }

    console.log("Line 34 - All Layouts:", allLayouts);
  } catch (err) {
    console.log("Line 25 - Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ------------ Add Seat to Layouts ------------------

router.post("/addseats/:layoutId", async (req, res, next) => {
  console.log("Line 87 req.body:", req.body);
  const { layoutId } = req.params;
  const { seats } = req.body;

  try {
    const layout = await Layout.findById(layoutId);
    seats.forEach(async (current) => {
      if (layout.seats.includes(current)) {
        return;
      }
      await Layout.findByIdAndUpdate(
        layoutId,
        {
          $push: { seats: req.body.seats },
        },
        { new: true }
      );
    });

    res.status(201).json({ msg: "Seat updated succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding layout" + error });
  }
});

// ------------ Delete Layouts ------------------

router.delete("/delete/:layoutId", async (req, res, next) => {
  try {
    const { layoutId } = req.params;

    const updatedData = req.body;

    await Layout.findByIdAndDelete(layoutId, updatedData, { new: true });

    const updatedLayout = await Layout.find({});
    res.json(updatedLayout);

    console.log("Line 124 - Deleted Layout", layoutId);
  } catch (err) {
    console.log("Line 126 - Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
