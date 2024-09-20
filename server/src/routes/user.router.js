import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  deleteAccount,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import passport from "passport";

const router = Router();

//route for register
router.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  registerUser
);

//route for login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  loginUser
);

// Apply `isAuthenticated` middleware to all routes that require authentication
router.use(isAuthenticated);

//route for logout
router.post("/logout", logoutUser);

//route for getting currentUser
router.get("/profile", getProfile);

//route for deleting the current user
router.delete("/delete-account", deleteAccount);

export default router;
