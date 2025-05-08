module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },  // ✅ Match MySQL column names
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: "users",
    timestamps: true,
    underscored: true  // ✅ Ensures Sequelize uses created_at & updated_at
  });

  return User;
};
