import express from "express";
import cookieParser from "cookie-parser";
import errorHandlingMiddleware from "./middleware/errorHandling.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.text())
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log(`Request URL: ${req.url}`);
//   console.log(`Request Method: ${req.method}`);
//   console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
//   console.log(`Request Body: ${JSON.stringify(req.body)}`);
//   next();
// });

// importing routes
import userRouter from "./routes/user.route.js";
import shopRouter from "./routes/shop.route.js";
// api routes

app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);

app.use(errorHandlingMiddleware);
export default app;
