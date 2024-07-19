import { asyncHandler } from "../utils/asyncHandler.js";
import { Goal } from "../models/goal.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addGoal = asyncHandler(async (req, res) => {
  const { user, title, description, amount } = req.body;

  if (
    [title?.trim(), description?.trim(), amount, user].some(
      (field) => field === ""
    )
  ) {
    res.status(400, "Please fill all fields");
  }

  try {
    const goal = await Goal.create({
      user,
      title,
      description,
      amount: parseInt(amount),
    });

    res.status(201).json(new ApiResponse(201, goal, "Goal added successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding Goal");
  }
});

const getGoals = asyncHandler(async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res
      .status(201)
      .json(new ApiResponse(201, goals, "fetched goals successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting Goals from database");
  }
});

const addMoneyToGoal = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params);
    return true;
  } catch (error) {
    console.log(error);
    res.status(500).send("Error addin money to Goal");
  }
});

const updateGoal = asyncHandler(async (req, res) => {
  const { user, title, description, amount, progress } = req.body;
  const { goalId } = req.params;

  if (
    [user, title?.trim(), description?.trim(), amount, progress, goalId].some(
      (field) => field === ""
    )
  ) {
    res.status(400).send("Please fill all fields");
  }

  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      goalId,
      {
        user,
        title,
        description,
        amount,
        progress,
      },
      { new: true }
    );
    res
      .status(201)
      .json(new ApiResponse(201, updatedGoal, "Goal updated successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error addin money to Goal");
  }
});

const deleteGoal = asyncHandler(async (req, res) => {
  const { goalId } = req.params;
  try {
    const deletedGoal = await Goal.findByIdAndDelete(goalId);
    res
      .status(201)
      .json(new ApiResponse(201, deletedGoal, "Goal deleted successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting goal");
  }
});

export { addGoal, getGoals, addMoneyToGoal, updateGoal, deleteGoal };
