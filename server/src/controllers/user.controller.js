import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.mondel.js  ";
import { Transaction } from "../models/transaction.model.js";
import { uploadToClounary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//register user
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, " Please fill all fields");
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(409, "User already exists with same email");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadToClounary(avatarLocalPath);

    if (!avatar) {
      throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password,
      avatar: avatar.url,
    });

    const createdUser = User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering User");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User created successfully"));
  } catch (error) {
    throw new ApiError(500, `Error registering user: ${error}`);
  }
});

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Fill all the fields");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(400, "User not found");
    }

    if (user.password !== password) {
      throw new ApiError(401, "Invalid Password");
    }

    return res.status(200).json(new ApiResponse(200, true, "Login Successful"));
  } catch (error) {
    throw new ApiError(500, `Error logging in user: ${error}`);
  }
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  if (req.session && req.session.user) {
    delete req.session.user;
  }
  res.status(200).json(new ApiResponse(200, "Logout Successful"));
});

//user profile
const profile = asyncHandler(async (req, res) => {
  try {
    if (!req.session && !req.session.user) {
      throw new ApiError(401, "Not Logged in");
    }

    res
      .status(200)
      .json(new ApiResponse(200, req.session.user, "Data sent Successfully"));
  } catch (error) {
    throw new ApiError(500, `Error fetching data: ${error}`);
  }
});

//edit the details of user profile details
const updateProfileData = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, " Please fill all fields");
  }

  try {
    await User.updateOne(
      {
        _id: req.session.user._id,
      },
      { $set: { username, email, password } }
    );

    req.session.user = await User.findOne({ _id: req.session.user._id });

    res
      .status(200)
      .json(new ApiResponse(200, true, "Profile Updated Successfully"));
  } catch (error) {
    throw new ApiError(500, `Error fetching data: ${error}`);
  }
});

//this route is used to delete the current user
const deleteAccount = asyncHandler(async (req, res) => {
  try {
    await Transaction.deleteMany({
      user: req.session.user._id,
    });

    await User.deleteOne({
      _id: req.session.user._id,
    });

    res
      .status(200)
      .json(new ApiResponse(200, true, "User delted successfully"));
  } catch (error) {
    throw new ApiError(500, `Error fetching data: ${error}`);
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  profile,
  updateProfileData,
  deleteAccount,
};
