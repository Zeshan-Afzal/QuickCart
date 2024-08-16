import asyncHandler from "../middleware/AsyncHandler.js";
import CouponCode from "../model/couponCode.models.js";
import ErrorHandler from "../utils/ErrorHandler.js";

const createCoupon = asyncHandler(async (req, res, next) => {

  try {
    const { name, selectProduct, discount, minPrice, maxPrice, shopId } =
      req.body;

    const isCouponeExist = await CouponCode.findOne({ name });
    if (isCouponeExist && isCouponeExist.length !== 0) {
      return next(new ErrorHandler(403, "Coupon already exist"));
    }

    const coupon = await CouponCode.create({
      name,
      selectProduct,
      discount,
      minPrice,
      maxPrice,
      shopId,
    });

    if (!coupon) return next(new ErrorHandler(500, "Internal server error"));
    res
      .status(200)
      .json({ success: true, message: "coupon created successfull", coupon });
  } catch (error) {
    next(new ErrorHandler(500, error.message || "interenal sever error"));
  }
});

const getShopCouponCodes = asyncHandler(async (req, res, next) => {
  try {
    const Id = req.params.id;
    const coupons = await CouponCode.find({ shopId: Id });
    if (!coupons) {
      return next(
        new ErrorHandler(404, "Shop doesn't have coupons or Invalid Id")
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Shop coupons fetched", coupons });
  } catch (error) {
    next(new ErrorHandler(500, error.message || "error in fetching products"));
  }
});

const deleteCoupon = asyncHandler(async (req, res, next) => {
  try {
    const Id = req.params.id;
    const findCoupon = await CouponCode.findById(Id);
    if (!findCoupon) return next(new ErrorHandler(404, "no coupon found"));

    const deleteCoupon = await CouponCode.findByIdAndDelete(Id);

    if (!deleteCoupon)
      return next(
        new ErrorHandler(500, "internal error while deleting coupon")
      );
    res
      .status(200)
      .json({ success: true, message: "coupon deleted successfully" });
  } catch (error) {
    next(
      new ErrorHandler(
        500,
        error.message || "internal error while deleting product"
      )
    );
  }
});

const applyCouponCode=asyncHandler(async(req, res, next)=>{

  try {
         const coupon=await CouponCode.findOne({name:req.body})
         
         if(!coupon){
          return next( new ErrorHandler(404, "Invalid Coupon Code"))
         }
           
         
         
         res.status(201).json({success:true, coupon, message:"coupon found successfull"})

      
        

    
  } catch (error) {
    next(
      new ErrorHandler(
        500,
        error.message || "internal error while deleting product"
      )
    );
    
  }


})

export { createCoupon, getShopCouponCodes, deleteCoupon ,applyCouponCode};
