const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const projectRoutes = require("./routes/projectRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes"); // ✅ Ensure this exists

// Use Routes
app.use("/api/projects", projectRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes); // ✅ Added user routes

// ✅ Sync Database (Creates tables if they don't exist)
db.sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synchronized");
}).catch((err) => {
  console.error("❌ Database sync failed:", err);
});

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
