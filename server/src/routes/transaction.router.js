import { Router } from "express";
import {
  addTransaction,
  history,
  filteredHistory,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transaction.controller.js";

const router = Router();

// Add a new expense
router.post("/addTransaction", addTransaction);

// Get transaction history
router.get("/history", history);

// Get filtered transaction history
router.post("/history/filtered", filteredHistory);

//Update and Delete transaction
router
  .route("/transaction/:id")
  .put(updateTransaction)
  .delete(deleteTransaction);

export default router;
