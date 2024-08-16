import asyncHandler from "./AsyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

const autheticUser = asyncHandler(async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken)
      return next(new ErrorHandler(404, "Unauthorized request"));

    const decodedInfo = jwt.verify(accessToken, process.env.JWT_SECRET);

    if (!decodedInfo) return next(new ErrorHandler(403, "Unauthorized user"));

    req.user = decodedInfo;
    next();
  } catch (error) {
    next(
      new ErrorHandler(
        500,
        error.message || "internal server error while checking authtentication"
      )
    );
  }
});
const autheticShop = asyncHandler(async (req, res, next) => {
  try {
    const shopToken = req.cookies.shop_token;

    if (!shopToken) return next(new ErrorHandler(404, "Unauthorized request"));

    const decodedInfo = jwt.verify(shopToken, process.env.JWT_SECRET);

    if (!decodedInfo) return next(new ErrorHandler(403, "Unauthorized user"));

    req.shop = decodedInfo;
    next();
  } catch (error) {
    next(
      new ErrorHandler(
        500,
        error.message || "internal server error while checking authtentication"
      )
    );
  }
});

export { autheticUser, autheticShop };
