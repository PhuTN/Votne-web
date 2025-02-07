const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");


// Routes for Settings
router.get("/", async (req, res) => {
  try {
    const settings = await Settings.find().populate("location");
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const newSettings = new Settings(req.body);
  try {
    const savedSettings = await newSettings.save();
    res.status(201).json(savedSettings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedSettings = await Settings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSettings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/settings/:id", async (req, res) => {
  try {
    await Settings.findByIdAndDelete(req.params.id);
    res.json({ message: "Settings deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
