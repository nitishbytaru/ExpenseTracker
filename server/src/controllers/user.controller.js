import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js  ";
import { Transaction } from "../models/transaction.model.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { extractPublicId } from "cloudinary-build-url";

//register user
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    return res.status(400).send("Please fill in all fields");
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
      return res.status(400).send("Please upload an avatar");
    }

    const avatar = await uploadToCloudinary(avatarLocalPath);

    if (!avatar) {
      return res.status(400).send("Avatar file is required");
    }

    //all the user form data is stored in this object after validation checking
    const createUser = {
      username: username.toLowerCase(),
      email,
      avatar: avatar.url,
    };

    //here is the pasport based registration is being used
    const registeredUser = await User.register(createUser, password);

    if (!registeredUser) {
      return res
        .status(500)
        .send("Something went wrong while registering User");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, registeredUser, "User created successfully"));
  } catch (error) {
    return res.status(500).send("Something went wrong while registering User");
  }
});

//logic to login the user
const loginUser = asyncHandler(async (req, res) => {
  const { _id, email, username } = req.user;
  res.json({
    success: true,
    message: "Login successful",
    user: { _id, username, email },
  });
});

//logic to logout the user
const logoutUser = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    res.send("you are logged out");
  });
});

//logic to get the entire data of the user
const getProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.find({ username: req.session.passport?.user });

    if (!user) {
      return res.status(401).send("Not Logged In");
    }

    return res.json(new ApiResponse(200, user, "User profile"));
  } catch (error) {
    return res
      .status(500)
      .send("Something went wrong while getting user profile");
  }
});

//edit the details of user profile details
const updateProfileData = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    res.status(400).send("Please provide all the fields");
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          username,
          email,
          password,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Profile Updated Successfully"));
  } catch (error) {
    res.status(500).send("Something went wrong while updating profile");
  }
});

//this route is used to delete the current user
const deleteAccount = asyncHandler(async (req, res) => {
  try {
    const publicId = extractPublicId(req.user.avatar);
    await deleteFromCloudinary(publicId);

    await Transaction.deleteMany({
      user: req.user?._id,
    });
    await User.findByIdAndDelete(req.user?._id);
    res.json(new ApiResponse(200, null, "Account Deleted Successfully"));
  } catch (error) {
    res.status(500).send("Something went wrong while deleting account");
  }
});

export {
  registerUser,
  getProfile,
  loginUser,
  logoutUser,
  updateProfileData,
  deleteAccount,
};
