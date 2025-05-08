module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: true },
    budget: { type: DataTypes.FLOAT, allowNull: true },
    status: { type: DataTypes.ENUM("pending", "ongoing", "completed"), defaultValue: "pending" },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: true, // ✅ Enables Sequelize to use createdAt and updatedAt
    underscored: true // ✅ Maps to created_at and updated_at in MySQL
  });

  return Project;
};
