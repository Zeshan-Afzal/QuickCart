import express from "express";
import {
  accountActivation,
  createUser,
  userLogin,
  getCurrentUser,
  logout,
  updateUserInfo,
  Address,
  deleteAddress,
 
} from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";
import { autheticUser } from "../middleware/autheticUser.js";

const router = express.Router();

router.route("/sign-up").post(upload.single("avatar"), createUser);
router.route("/activation").post(accountActivation);
router.route("/login").post(userLogin);
router.route("/get-user").get(autheticUser, getCurrentUser);
router.route("/update-user").post(upload.single("avatar"),autheticUser, updateUserInfo);

router.route("/logout").get(autheticUser, logout);
router.route("/delete-address").post(upload.none(),autheticUser, deleteAddress);

router.route("/add-address").post(upload.none(),autheticUser, Address);


export default router;
