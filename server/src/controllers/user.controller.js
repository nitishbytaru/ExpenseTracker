import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js  ";
import { Transaction } from "../models/transaction.model.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { extractPublicId } from "cloudinary-build-url";
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
    return res
      .status(500)
      .send(
        " something went wrong while generating access and refresh Token           "
      );
  }
};

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(400).send("Unotherized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res.status(401).send("Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res.status(401).send("Refresh Token Expried");
    }

    const options = {
      httpOnly: true,
      secure: true,
       sameSite: 'None',
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
    return res.status(401).send("Invalid Refresh Token");
  }
});

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

    const createdUser = await User.create({
      username: username.toLowerCase(),
      email,
      password,
      avatar: avatar.url,
    });

    if (!createdUser) {
      return res
        .status(500)
        .send("Something went wrong while registering User");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User created successfully"));
  } catch (error) {
    return res.status(500).send("Something went wrong while registering User");
  }
});

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    return res.status(400, "Fill all the fields");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.password !== password) {
      return res.status(406).send("Invalid Password");
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
       sameSite: 'None',
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
    return res.status(500).send("Something went wrong while logging in User");
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
  loginUser,
  logoutUser,
  getProfile,
  updateProfileData,
  deleteAccount,
  refreshAccessToken,
};
