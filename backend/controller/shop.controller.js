import asyncHandler from "../middleware/AsyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/mailSender.js";
import sendAccessToken from "../utils/sendAccessToken.js";
import Shop from "../model/shop.models.js";
import sendShopAccessToken from "../utils/sendShopToken.js";
import uploadToCloudinary from "../utils/cloudinary.js";
const createShop = asyncHandler(async (req, res, next) => {
  try {
    const { shopName, email, password, phoneNumber, address, zipCode } =
      req.body;
    const filePath = req.file?.path;
    const shopExist = await Shop.findOne({ email });
    if (shopExist) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return next(new ErrorHandler(402, "user already exist"));
    }

    const newShop = {
      shopName,
      email,
      password,
      phoneNumber,
      address,
      zipCode,
      avatar: filePath,
    };

    const activationToken = generateActivationToken(newShop);
    const activationUrl = `http://localhost:5173/shop-activation/${activationToken}`;
    try {
      await sendMail({
        email: newShop.email,
        subject: "activate your account",
        message: `Hello dear, ${newShop.fullName} click on the link to activate your accoutn ${activationUrl}`,
      });
      res.status(200).json({
        success: true,
        message: `check your email to activat your accoutn`,
      });
    } catch (error) {
      next(new ErrorHandler(500, error.message));
    }
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    next(new ErrorHandler(500, error.message));
  }
});

const generateActivationToken = (shop) => {
  return jwt.sign(shop, process.env.JWT_ACTIVATION_SECRET, { expiresIn: "5m" });
};

const shopActivation = asyncHandler(async (req, res, next) => {
  try {
    const { shopToken } = req.body;

    const shopData = jwt.verify(shopToken, process.env.JWT_ACTIVATION_SECRET);

    if (!shopData) {
      return next(new ErrorHandler(404, "token expired"));
    }

    const { shopName, email, password, phoneNumber, address, zipCode, avatar } =
      shopData;
    const existingShop = await Shop.findOne({ email });
    if (existingShop) return next(new ErrorHandler(404, "user already exist"));
    const uploadedFile = await uploadToCloudinary(avatar);
    if (!uploadedFile)
      return next(
        new ErrorHandler(404, "internal server error in uploading file")
      );
    const newShop = await Shop.create({
      shopName,
      email,
      password,
      phoneNumber,
      address,
      zipCode,
      avatar: uploadedFile.url,
    });

    if (!newShop)
      return next(new ErrorHandler(500, "internal error while creating user"));

    const shop = await Shop.findById(newShop._id).select("-password");

    sendShopAccessToken(shop, 200, "Shop created successfully", res);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

//login user

const shopLogin = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findShop = await Shop.findOne({ email });

    if (!findShop) return next(new ErrorHandler(404, "User not found"));

    const isEnterdPasswordCorrect = await findShop.isPasswordCorrect(password);

    const shop = await Shop.findOne({ email }).select("-password");
    if (!isEnterdPasswordCorrect)
      return next(new ErrorHandler(403, "Wrong cridentials"));

    sendShopAccessToken(shop, 200, "logged in successfully", res);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

const getShop = asyncHandler(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.shop.id).select("-password");
    if (!shop) return next(new ErrorHandler(404, "Unauthorized user"));

    res
      .status(200)
      .json({ success: true, shop, message: "shop info fetched successfully" });
  } catch (error) {
    next(
      new ErrorHandler(500, error.message || "server error while getting user")
    );
  }
});

const getShopInfo = asyncHandler(async (req, res, next) => {
  try {
    const Id = req.params.id;
    const shopInfo = await Shop.findById(Id).select("-password -email");
    console.log(shopInfo);
    if (!shopInfo) {
      return next(new ErrorHandler(404, "No shop found  or Invalid Id"));
    }

    res.status(200).json({ success: true, message: "Shop  fetched", shopInfo });
  } catch (error) {
    next(new ErrorHandler(500, error.message || "error in fetching products"));
  }
});

const logout = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie("shop_token");
    res
      .status(200)
      .json({ success: true, message: "shop logout successfully" });
  } catch (error) {
    next(
      new ErrorHandler(500, error.message || "server error while logging out")
    );
  }
});

export { createShop, shopActivation, shopLogin, getShop, logout, getShopInfo };
