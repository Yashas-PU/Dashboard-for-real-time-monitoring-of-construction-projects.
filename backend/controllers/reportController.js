const { Report } = require("../models");
exports.generateReport = async (req, res) => {
    try {
        const reports = await Report.findAll();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};