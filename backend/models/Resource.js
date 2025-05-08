module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define("Resource", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.ENUM("manpower", "equipment"), allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("active", "inactive", "maintenance"), defaultValue: "active" },
    assigned_project_id: { type: DataTypes.INTEGER },
  });

  return Resource;
};
