module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define("Report", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.ENUM("project_summary", "resource_efficiency", "budget_report"), allowNull: false },
    generated_by: { type: DataTypes.INTEGER, allowNull: false },
    generated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  return Report;
};
