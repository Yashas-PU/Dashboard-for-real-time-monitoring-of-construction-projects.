module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM("pending", "in progress", "completed"), defaultValue: "pending" },
    assigned_to: { type: DataTypes.INTEGER },
    project_id: { type: DataTypes.INTEGER },
    due_date: { type: DataTypes.DATE },
  });

  return Task;
};
