import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath, files) => {
  if (!filePath) {
    console.log("No file path provided");
    return null;
  }

  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    if (!response.url) {
      console.log("No URL in response from Cloudinary");
      return null;
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

export const deleteFromCloudinary = async (file) => {
  try {
    // let idsToDelete;
    // console.log(files);

    if (!file) {
      console.log("files is null or empty");
      return null;
    }

    // if (typeof files === "string") {
    //   idsToDelete = [files];
    // } else if (Array.isArray(files)) {
    //   idsToDelete = files;
    // }
    // console.log(idsToDelete);

    const response = await cloudinary.uploader.destroy(file, {
      invalidate: true,
    });
    if (!response) return null;
    console.log(response);
    return response;
  } catch (error) {
    console.log(error, "errror while deleting images");
  }
};

export default uploadToCloudinary;
