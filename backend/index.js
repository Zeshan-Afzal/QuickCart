import app from "./app.js";
import dotenv from "dotenv";
import dataBaseConnection from "./db/database.js";
dotenv.config();

const server = app.listen(process.env.PORT, () => {
  console.log(`app is listening on ${process.env.PORT}`);
});
dataBaseConnection();

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`shutting down the server to handle the ${err} `);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit();
  }
});

process.on("unhandledRejection", (err) => {
  console.log(`Error in handling promise: ${err.message}`);
  console.log(
    `server is shutting down to handle unhandled promise rejection ${err}`
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit();
  }
});

app.get('/', (req, res)=>{
  res.send("hello there")

})