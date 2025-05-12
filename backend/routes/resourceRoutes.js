const express = require("express");
const router = express.Router();
const { Resource } = require("../models");

// Create a Resource (Manpower or Equipment)
router.post("/", async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Resources
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.findAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Resource by ID
router.get("/:id", async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Resource
router.put("/:id", async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    await resource.update(req.body);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Resource
router.delete("/:id", async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    await resource.destroy();
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
