const express = require("express");
const router = express.Router();
const { Project } = require("../models");

// Create a Project
router.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await project.update(req.body);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await project.destroy();
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
