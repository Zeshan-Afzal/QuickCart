import asyncHandler from "../middleware/AsyncHandler.js";
import Product from "../model/product.models.js";
import Shop from "../model/shop.models.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import uploadToCloudinary, {
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import Event from "../model/event.models.js";

const createEvent = asyncHandler(async (req, res, next) => {
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
      startDate,
      endDate,
    } = req.body;
    if (
      [
        productName,
        description,
        category,
        shopId,
        discountedPrice,
        stock,
        endDate,
        startDate,
      ].some((item) => item === undefined || item === null || item === "")
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

    const event = await Event.create({
      productName,
      description,
      category,
      shopId,
      discountedPrice,
      originalPrice,
      stock,
      tags,
      shop: shop,
      startDate,
      endDate,
      images: imagesArr,
    });

    if (!event) return next(new ErrorHandler(500, "Internal server error"));
    res
      .status(200)
      .json({ success: true, message: "event created successfull", event });
  } catch (error) {
    next(new ErrorHandler(500, error.message || 500, "interenal sever error"));
  }
});

const getShopEvents = asyncHandler(async (req, res, next) => {
  try {
    const Id = req.params.id;
    const events = await Event.find({ shopId: Id });
    if (!events) {
      return next(
        new ErrorHandler(404, "Shop doesn't have events or Invalid Id")
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Shop events fetched", events });
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

const deleteEvent = asyncHandler(async (req, res, next) => {
  try {
    const Id = req.params.id;
    const findEvent = await Event.findById(Id);
    if (!findEvent) return next(new ErrorHandler(404, "no event found"));
    const images = findEvent.images;
    const imagesToDelete = images.map((image) =>
      deleteFromCloudinary(image.id)
    );

    const deletingImages = await Promise.all(imagesToDelete);
    if (!deletingImages)
      return next(new ErrorHandler(404, "Error in delteing images"));
    const deleteEvent = await Event.findByIdAndDelete(Id);

    if (!deleteEvent)
      return next(
        new ErrorHandler(500, "internal error while deleting product")
      );
    res
      .status(200)
      .json({ success: true, message: "event deleted successfully" });
  } catch (error) {
    next(
      new ErrorHandler(
        500,
        error.message || "internal error while deleting event"
      )
    );
  }
});

const getAllEvents = asyncHandler(async (req, res, next) => {
  try {
    const allEvents = await Event.find();
    if (!allEvents || allEvents.length === 0) {
      return next(new ErrorHandler(404, "No events found"));
    }

    res
      .status(200)
      .json({ success: true, message: "All events fetched", allEvents });
  } catch (error) {
    next(new ErrorHandler(500, error.message || "error in fetching events"));
  }
});

export {
  createEvent,
  getShopEvents,
  getAllProducts,
  deleteEvent,
  getAllEvents,
};
