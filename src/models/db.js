import Sequelize from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize(
  process.env.REACT_APP_DB_NAME,
  process.env.REACT_APP_DB_USER,
  process.env.REACT_APP_DB_PASSWORD,
  {
    host: process.env.REACT_APP_DB_HOST,
    dialect: process.env.REACT_APP_DB_DIALECT,
    dialectModule: import("mysql2").default,
  }
);

export default sequelize;
