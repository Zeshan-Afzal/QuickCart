import asyncHandler from "../middleware/AsyncHandler.js";
import User from "../model/user.models.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/mailSender.js";
import sendAccessToken from "../utils/sendAccessToken.js";
import uploadToCloudinary, { deleteFromCloudinary } from "../utils/cloudinary.js";
const createUser = asyncHandler(async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const filePath = req.file?.path;
    const userExist = await User.findOne({ email }); 
    if (userExist) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return next(new ErrorHandler(402, "user already exist"));
    }

    const newUser = {
      fullName,
      email,
      password,
      avatar: filePath,
    };

    const activationToken = generateActivationToken(newUser);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    try {
      await sendMail({
        email: newUser.email,
        subject: "activate your account",
        message: `Hello dear, ${newUser.fullName} click on the link to activate your accoutn ${activationUrl}`,
      });
      res.status(200).json({
        success: true,
        message: `check your email to activat your accoutn`,
      });
    } catch (error) {
      next(new ErrorHandler(500, error.message));
    }
  } catch (error) {
    console.log(error);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    next(new ErrorHandler(500, error.message));
  }
});

const generateActivationToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACTIVATION_SECRET, { expiresIn: "5m" });
};

const accountActivation = asyncHandler(async (req, res, next) => {
  try {
    let { userToken } = req.body;

    const userData = jwt.verify(userToken, process.env.JWT_ACTIVATION_SECRET);

    if (!userData) {
      return next(new ErrorHandler(404, "token expired"));
    }

    const { fullName, email, password, avatar } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) return next(new ErrorHandler(404, "user already exist"));
    const uploadedFile = await uploadToCloudinary(avatar);

    if (!uploadedFile)
      return next(new ErrorHandler(500, "internal error in uploading file"));
    const newUser = await User.create({
      fullName,
      email,
      password,
      avatar: {url:uploadedFile.url, id:uploadedFile.public_id}
    });

    if (!newUser)
      return next(new ErrorHandler(500, "internal error while creating user"));

    const user = await User.findById(newUser._id).select("-password");

    sendAccessToken(user, 200, "User created successfully", res);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

//login user

const userLogin = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) return next(new ErrorHandler(404, "User not found"));

    const isEnterdPasswordCorrect = await findUser.isPasswordCorrect(password);

    const user = await User.findOne({ email }).select("-password");
    if (!isEnterdPasswordCorrect)
      return next(new ErrorHandler(403, "Wrong cridentials"));

    sendAccessToken(user, 200, "user logged in successfully", res);
  } catch (error) {
    next(new ErrorHandler(500, error.message));
  }
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return next(new ErrorHandler(404, "Unauthorized user"));

    res
      .status(200)
      .json({ success: true, user, message: "user info fetched successfully" });
  } catch (error) {
    next(
      new ErrorHandler(500, error.message || "server error while getting user")
    );
  }
});

const updateUserInfo=asyncHandler(async (req, res, next)=>{

  try {
    const {name, email, password, phoneNumber}=req.body
    

    let user=await User.findById(req.user.id)
    
    const isCorrectPass=await user.isPasswordCorrect(password)
    if(!isCorrectPass){
      return next(new ErrorHandler(402,"entered password is incorrect"))
    }
    
    
     
    const filePath=req.file?.path

    if(filePath){

      const uploadingFile= await uploadToCloudinary(filePath)
      if(!uploadingFile){ return next(new ErrorHandler(501, "Internal error during upload"))}
       const deleteingFile= await deleteFromCloudinary(user.avatar.id) 
      if(!deleteingFile)  return next(new ErrorHandler(501, "Internal error during deletion"));
      user.avatar={url:uploadingFile.url, id:uploadingFile.public_id}


    }
       
       user.fullName=name?name:user.fullName
       user.email=email?email:user.email
       user.phoneNumber=phoneNumber?Number(phoneNumber):user.phoneNumber 
       await user.save()
       let dataWithoutPassword=user.toObject()
       delete dataWithoutPassword.password
       user=dataWithoutPassword
       res.status(200).json({success:true, user, message:"User info update successfully"})

    
  } catch (error) {
    next(
      new ErrorHandler(500, error.message || "server error while getting user")
    );
  }

}) 


const Address= asyncHandler(async(req, res , next)=>{
   try {

     const user=await User.findById(req.user.id)
      const isAddressTypeExist= await user.address.find((adres)=>adres.addressType===req.body.addressType)

      if(isAddressTypeExist){
        console.log('error')
        return next(new ErrorHandler(403, `${req.body.addressType} address already exist`))
      }else{ user.address.push(req.body)

      await  user.save()
     res.status(200).json({success:true, user, message:"address Added successfull"})}

    
   } catch (error) {
    next(
      new ErrorHandler(500, error.message || "server error while getting user")
    );
   }

})


const deleteAddress=asyncHandler(async(req, res, next)=>{

  console.log(req.body)

  try {
    const user= await User.findById(req.user.id)
    
     const findAddressToDelete= user.address.find((address)=>address.addressType===req.body)
     if(!findAddressToDelete){
      return (new ErrorHandler(439, "No such address Exist"))
     }
     const addressesAfterDeleting= user.address.filter((adrs)=>adrs.addressType!==req.body)
    
     user.address=addressesAfterDeleting

     await user.save()

     res.status(200).json({success:true,user, message:"address deleted successfully"})


    
  } catch (error) {
    next(
      new ErrorHandler(500, error.message || "server error while getting user")
    );
  }


})


const logout = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res
      .status(200)
      .json({ success: true, message: "user logout successfully" });
  } catch (error) {
    next(
      new ErrorHandler(500, error.message || "server error while getting user")
    );
  }
});

export { createUser, accountActivation, userLogin, getCurrentUser, logout,updateUserInfo , Address, deleteAddress };






