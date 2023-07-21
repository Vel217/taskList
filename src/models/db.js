import Sequelize from "sequelize";

const sequelize = new Sequelize(
  "testTask2",
  "lera",
  "RwmbTpAgqyq2YG9qx4N3yeYzmrZBhiyK4!",
  {
    host: "161.35.215.240",
    dialect: "mysql",
  }
);

export default sequelize;
