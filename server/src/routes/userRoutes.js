import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

//register user
router.post("/home/signup", userController.register);

//login user
router.post("/home/login", userController.login);

//logout user
router.get("/home/logout", userController.logout);

//user profile
router.get("/home/profile", userController.profile);

//make the updates of details in the profile
router.put("/home/updateProfileData", userController.updateProfileData);

//this route is used to delete the current user
router.get("/home/deleteAccount", userController.deleteAccount);

//add expense
router.post("/home/expense", userController.addExpense);

//get transaction history
router.get("/home/history", userController.history);

//get transaction history with filters
router.post("/home/filteredHistory", userController.filteredHistory);

//expense analysis
router.post("/home/analysis", userController.analysis);

//delete a transaction
router.delete("/home/deleteTransaction/:id", userController.deleteTransaction);

//update a transaction
router.put("/home/updateTransaction/:id", userController.updateTransaction);

export default router;
