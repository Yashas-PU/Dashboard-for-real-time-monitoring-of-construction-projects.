const express = require("express");
const router = express.Router();
const { Report } = require("../models");

// ✅ Fetch all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (error) {
    console.error("❌ Error fetching reports:", error);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

module.exports = router;
