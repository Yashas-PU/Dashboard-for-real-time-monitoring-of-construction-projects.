const db = require("../config/db");

// Fetch Dashboard Metrics
exports.getDashboardStats = async (req, res) => {
  try {
    const [totalProjects] = await db.query("SELECT COUNT(*) AS total FROM projects");
    const [activeEquipment] = await db.query("SELECT COUNT(*) AS total FROM resources WHERE type='equipment' AND status='active'");
    const [manpowerUtilization] = await db.query("SELECT COUNT(*) AS total FROM resources WHERE type='manpower'");

    res.json({
      totalProjects: totalProjects[0].total,
      activeEquipment: activeEquipment[0].total,
      manpowerUtilization: manpowerUtilization[0].total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
