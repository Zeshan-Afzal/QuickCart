import asyncHandler from "../middleware/AsyncHandler.js";
import Product from "../model/product.models.js";
import Shop from "../model/shop.models.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import uploadToCloudinary, {
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const {
      productName,
      description,
      category,
      shopId,
      discountedPrice,
      originalPrice,
      stock,
      tags,
    } = req.body;
    if (
      [productName, description, category, shopId, discountedPrice, stock].some(
        (item) => item === undefined || item === null || item === ""
      )
    ) {
      next(new ErrorHandler(404, "All * fields are required"));
    }

    if (!req.files || req.files.length === 0) {
      next(new ErrorHandler(402, "Upload one images alteast"));
    }

    const files = req.files.map((file) => file.path);
    const promises = files.map((file) => uploadToCloudinary(file));
    const uploadedFiles = await Promise.all(promises);

    const imagesArr = uploadedFiles.map((file) => {
      return { url: file.url, id: file.public_id };
    });

    const shop = await Shop.findById(shopId).select("-password -email");
    if (!shop) {
      next(new ErrorHandler(403, "Invalid shop Id"));
    }

    const product = await Product.create({
      productName,
      description,
      category,
      shopId,
      discountedPrice,
      originalPrice,
      stock,
      tags,
      shop: shop,
      images: imagesArr,
    });

    if (!product) return next(new ErrorHandler(500, "Internal server error"));
    res
      .status(200)
      .json({ success: true, message: "product created successfull", product });
  } catch (error) {
    next(new ErrorHandler(500, error.message || "interenal sever error"));
  }
});

const getShopProducts = asyncHandler(async (req, res, next) => {
  try {
    const Id = req.params.id;
    const products = await Product.find({ shopId: Id });
    if (!products) {
      return next(
        new ErrorHandler(404, "Shop doesn't have products or Invalid Id")
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Shop products fetched", products });
  } catch (error) {
    next(new ErrorHandler(500, error.message || "error in fetching products"));
  }
});
const getAllProducts = asyncHandler(async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    if (!allProducts || allProducts.length === 0) {
      return next(new ErrorHandler(404, "No products found"));
    }

    res
      .status(200)
      .json({ success: true, message: "All products fetched", allProducts });
  } catch (error) {
    next(new ErrorHandler(500, error.message || "error in fetching products"));
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const Id = req.params.id;
    const findProduct = await Product.findById(Id);
    if (!findProduct) return next(new ErrorHandler(404, "no product found"));
    const images = findProduct.images;
    const imagesToDelete = images.map((image) =>
      deleteFromCloudinary(image.id)
    );

    const deletingImages = await Promise.all(imagesToDelete);
    if (!deletingImages)
      return next(new ErrorHandler(404, "Error in delteing images"));
    const deleteProduct = await Product.findByIdAndDelete(Id);

    if (!deleteProduct)
      return next(
        new ErrorHandler(500, "internal error while deleting product")
      );
    res
      .status(200)
      .json({ success: true, message: "product deleted successfully" });
  } catch (error) {
    next(
      new ErrorHandler(
        500,
        error.message || "internal error while deleting product"
      )
    );
  }
});

export { createProduct, getShopProducts, getAllProducts, deleteProduct };
