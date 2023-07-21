import DataTypes from "sequelize";
import sequelize from "./db.js";
import Admin from "./Admin.js";

const Session = sequelize.define(
  "Session",
  {
    session: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
);

Session.belongsTo(Admin, { foreignKey: "userId" });

await sequelize.sync();

export default Session;
