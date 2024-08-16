import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true, // Corrected from "require" to "required"
    },
    description: {
      type: String,
      required: true,
    }, 
    category: { 
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: String,
      default: "Running",
    },
    shopId: {
      type: String,
      required: true,
    },
    shop: {
      type: Object,
      required: true,
    },
    discountedPrice: {
      type: Number,
    },
    originalPrice: {
      // Corrected spelling from "orignalPrice"
      type: Number,
      required: true,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    images: {
      type: [
        {
          url: { type: String, required: true },
          id: { type: String, required: true },
        },
      ],
      required: true,
    },
    tags: {
      type: String,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema); // Removed "new" keyword

export default Event;
