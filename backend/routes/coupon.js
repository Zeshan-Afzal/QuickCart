import express from "express";
import { autheticShop } from "../middleware/autheticUser.js";
import { createCoupon } from "../controller/couponCode.controller.js";

const router = express.Router();

router.route("/create-coupon").post(createCoupon);

export default router;
