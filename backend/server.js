const express = require("express");
const cors = require("cors");
const db = require("./models");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const projectRoutes = require("./routes/projectRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Use Routes
app.use("/api/projects", projectRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/notifications", notificationRoutes);

// ✅ Sync Database
const startServer = async () => {
    try {
        await db.sequelize.sync({ alter: true });
        console.log("✅ Database synchronized");
        
        const PORT = process.env.PORT || 5001;
        app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
    } catch (err) {
        console.error("❌ Database sync failed:", err);
    }
};

startServer();
