import DataTypes from "sequelize";
import sequelize from "./db.js";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  editedByAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
await sequelize.sync();
export default Task;
