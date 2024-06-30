import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  profile,
  updateProfileData,
  deleteAccount,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middlerware.js";

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

//secured route
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/profile").post(profile);

router.route("/editProfile").post(updateProfileData);

router.route("/delete").post(deleteAccount);

export default router;
