import { Router } from "express";
import {
  addExpense,
  history,
  filteredHistory,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middleware/auth.middlerware.js";

const router = Router();

// Add a new expense
router.post("/expense", verifyJWT, addExpense);

// Get transaction history
router.get("/history", verifyJWT, history);

// Get filtered transaction history
router.get("/history/filtered", verifyJWT, filteredHistory);

// Update a transaction
router.put("/updateTransaction/:id", verifyJWT, updateTransaction);

// Delete a transaction
router.delete("/deleteTransaction/:id", verifyJWT, deleteTransaction);

export default router;
