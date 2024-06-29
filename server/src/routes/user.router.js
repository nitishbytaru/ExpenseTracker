import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  profile,
  updateProfileData,
  deleteAccount,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),

  registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);

router.route("/profile").post(profile);

router.route("/editProfile").post(updateProfileData);

router.route("/delete").post(deleteAccount);

export default router;
