import { Router } from "express";
import {
  addExpense,
  history,
  filteredHistory,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transaction.controller.js";

const router = Router();

router.route("/addExpense").post(addExpense);
router.route("/history").post(history);
router.route("/filteredHistory").post(filteredHistory);
router.route("/delete").post(deleteTransaction);
router.route("/update").post(updateTransaction);

export default router;
