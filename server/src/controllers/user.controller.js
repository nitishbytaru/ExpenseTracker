import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.mondel.js  ";
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
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
        req.session.user = user;
        res.status(200).send("Login successful");
      } else {
        res.status(401).send("Invalid email or password");
      }
    } else {
      res.status(500).send("User dosenot exist");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error");
  }
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  if (req.session && req.session.user) {
    delete req.session.user;
  }
  res.status(200).send("Logged out successfully");
});

//user profile
const profile = asyncHandler(async (req, res) => {
  try {
    if (req.session && req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(401).send("Not logged in");
    }
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).send("Internal Server Error");
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
    res.status(200).send("Data updated successfully");
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).send("Internal Server Error");
  }
});

//this route is used to delete the current user
const deleteAccount = asyncHandler(async (req, res) => {
  try {
    await Expense.deleteMany({
      user: req.session.user._id,
    });
    await User.deleteOne({
      _id: req.session.user._id,
    });
    res.status(200).send("User delted successfully");
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).send("Internal Server Error");
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
