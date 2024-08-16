import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const shopSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password should be 8 characters atleast"],
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

shopSchema.methods.getAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

shopSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
