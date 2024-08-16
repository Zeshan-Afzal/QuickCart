import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password should be 8 characters atleast"],
    },
    avatar: {
      type:{
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
      required: true,
    },
    address:[ {address:{type:String}, country:{type:String}, zipcod:{type:Number}, city:{type:String} ,addressType:{type:String}, phoneNumber:{type:Number}}],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods.getAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
