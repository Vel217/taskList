import DataTypes from "sequelize";
import sequelize from "./db.js";

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
await sequelize.sync();

export default Admin;
