import mongoose from "mongoose";
import { MY_Database } from "../constant.js";

const dataBaseConnection = () => {
  mongoose
    .connect(`${process.env.MONGO_DB_URI}/${MY_Database}`)
    .then((res) => {
      console.log(
        `connected to mongoDB successfully with the server:${res.connection.host}`
      );
    })
    .catch((err) => {
      console.log(`Error in connecting with mongoDb: ${err.message}`);
      process.exit(1);
    });
};
export default dataBaseConnection;
