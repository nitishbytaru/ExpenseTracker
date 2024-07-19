import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addGoal,
  getGoals,
  addMoneyToGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller.js";
const router = Router();

//add new budget
router.post("/addGoal", verifyJWT, addGoal);

//get all goals
router.get("/getGoals", verifyJWT, getGoals);

//add money to the goal
router.post("/addMoneyToGoal/:userId", verifyJWT, addMoneyToGoal);

//update the goal
router.post("/updateGoal/:goalId", verifyJWT, updateGoal);

//delete the goal
router.get("/deleteGoal/:goalId", verifyJWT, deleteGoal);

export default router;
