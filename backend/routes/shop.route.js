import express from "express";
import { upload } from "../middleware/multer.js";
import { autheticShop } from "../middleware/autheticUser.js";
import {
  createShop,
  getShop,
  getShopInfo,
  logout,
  shopActivation,
  shopLogin,
} from "../controller/shop.controller.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getShopProducts,
} from "../controller/products.js";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getShopEvents,
} from "../controller/event.controller.js";
import {
  applyCouponCode,
  createCoupon,
  deleteCoupon,
  getShopCouponCodes,
} from "../controller/couponCode.controller.js";

const router = express.Router();

router.route("/create-shop").post(upload.single("avatar"), createShop);
router.route("/activation").post(shopActivation);
router.route("/login").post(shopLogin);
router.route("/get-shop").get(autheticShop, getShop);
router
  .route("/create-product")
  .post(upload.array("images"), autheticShop, createProduct);
router
  .route("/create-event")
  .post(upload.array("images"), autheticShop, createEvent);
router.route("/get-shop-info/:id").get(getShopInfo);

router.route("/get-shop-product/:id").get(getShopProducts);
router.route("/get-shop-events/:id").get(getShopEvents);
router.route("/get-all-product").get(getAllProducts);
router.route("/get-all-events").get(getAllEvents);
router.route("/delete-product/:id").get(autheticShop, deleteProduct);
router.route("/delete-event/:id").get(autheticShop, deleteEvent);
router.route("/create-coupon").post(upload.none(), autheticShop, createCoupon);
router.route("/get-shop-coupons/:id").get(autheticShop, getShopCouponCodes);
router.route("/delete-coupon/:id").get(autheticShop, deleteCoupon);
router.route("/apply-coupon").post( applyCouponCode);

router.route("/logout").get(autheticShop, logout);

// router.route("/logout").get(autheticUser, logout);

export default router;
