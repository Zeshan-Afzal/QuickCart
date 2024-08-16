import ErrorHandler from "../utils/ErrorHandler.js";

const errorHandlingMiddleware = (err, req, res, next) => {
  err.statuseCode = err.statuseCode || 500;
  err.message = err.message || "Internal server error";
  if (err.name === "CastEror") {
    err = new ErrorHandler(400, "Resource not found Invalid Id");
  }
  if (err.code === 11000) {
    err = new ErrorHandler(
      404,
      `Duplicate key ${Object.keys(err.keyValue)} Entered`
    );
  }
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler(
      404,
      "Your Toke is Invalid :: Unauthorizsed request"
    );
  }
  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler(404, "Your Toke is expired:: Unauthorizsed request");
  }

  res.status(err.statuseCode).json({
    success: false,
    message: err.message,
  });
};

export default errorHandlingMiddleware;
