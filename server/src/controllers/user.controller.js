import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js  ";
import { Transaction } from "../models/transaction.model.js";
import { uploadToClounary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating access and refresh Token"
    );
  }
};

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Unotherized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token Expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

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

    const createdUser = await User.create({
      username: username.toLowerCase(),
      email,
      password,
      avatar: avatar.url,
    });

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering User");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User created successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Error registering user");
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

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "User logged in successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, error?.message || "Error logging in user");
  }
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

//user profile
const getProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(401, "Not Logged in");
    }

    res.json(new ApiResponse(200, user, "User profile"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Error fetching user profile");
  }
});

//edit the details of user profile details
const updateProfileData = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, " Please fill all fields");
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
    throw new ApiError(500, error?.message || "Error updating user profile");
  }
});

//this route is used to delete the current user
const deleteAccount = asyncHandler(async (req, res) => {
  try {
    await Transaction.deleteMany({
      user: req.user?._id,
    });
    await User.findByIdAndDelete(req.user?._id);
    res.json(new ApiResponse(200, null, "Account Deleted Successfully"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Error deleting user profile");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfileData,
  deleteAccount,
  refreshAccessToken,
};
