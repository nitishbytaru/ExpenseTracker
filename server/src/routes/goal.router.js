import { Router } from "express";
import {
  addGoal,
  getGoals,
  addMoneyToGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller.js";
const router = Router();

//add new budget
router.post("/addGoal", addGoal);

//get all goals
router.get("/getGoals", getGoals);

//add money to the goal
router.post("/addMoneyToGoal/:userId", addMoneyToGoal);

//update the goal
router.post("/updateGoal/:goalId", updateGoal);

//delete the goal
router.get("/deleteGoal/:goalId", deleteGoal);

export default router;
