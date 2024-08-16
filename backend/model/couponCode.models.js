import mongoose from "mongoose";

const couponCodeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    discount: { type: Number, required: true },
    minPrice: { type: Number },
    maxPrice: { type: Number },
    shopId: { type: String, required: true },
    selectProduct: { type: String, required: true },
  },
  { timestamps: true } 
);

const CouponCode = mongoose.model("CouponCode", couponCodeSchema);

export default CouponCode;
