import { Router } from "express";
import {
  addTransaction,
  history,
  filteredHistory,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middleware/auth.middlerware.js";

const router = Router();

// Add a new expense
router.post("/addTransaction", verifyJWT, addTransaction);

// Get transaction history
router.get("/history", verifyJWT, history);

// Get filtered transaction history
router.post("/history/filtered", verifyJWT, filteredHistory);

//Update and Delete transaction
router
  .route("/transaction/:id")
  .put(verifyJWT, updateTransaction)
  .delete(verifyJWT, deleteTransaction);


export default router;
