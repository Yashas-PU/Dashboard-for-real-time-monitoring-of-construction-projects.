module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    message: { type: DataTypes.TEXT, allowNull: false },
    type: { type: DataTypes.ENUM("info", "warning", "alert"), allowNull: false },
    project_id: { type: DataTypes.INTEGER },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Notification;
};
