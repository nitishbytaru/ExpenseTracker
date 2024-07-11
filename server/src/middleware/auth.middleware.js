import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replce("Bearer ", "");

    console.log(token);

    if (!token) {
      return res.status(401).send("Not authorized");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).send("Not authorized");
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).send("Invalid accessToken");
  }
});
