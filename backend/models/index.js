const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const db = {};

// Import Models
db.User = require("./User")(sequelize, DataTypes);
db.Project = require("./Project")(sequelize, DataTypes);
db.Resource = require("./Resource")(sequelize, DataTypes);
db.Task = require("./Task")(sequelize, DataTypes);
db.Report = require("./Report")(sequelize, DataTypes);
db.Notification = require("./Notification")(sequelize, DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
