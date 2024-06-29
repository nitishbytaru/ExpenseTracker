import { asyncHandler } from "../utils/asyncHandler.js";
import { Transaction } from "../models/transaction.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//add expense
const addExpense = asyncHandler(async (req, res) => {
  const { user, income, note, expense, transactionDate } = req.body;

  if (
    [user, income, note, expense, transactionDate].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Fill all the fields");
  }

  try {
    const transaction = await Transaction.create({
      user,
      income,
      note,
      expense,
      transactionDate,
    });

    res
      .status(201)
      .json(new ApiResponse(201, transaction, "Expense added successfully"));
  } catch (error) {
    throw new ApiError(500, `Error adding expense${error}`);
  }
});

//transaction history
const history = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.session.user._id,
    });
    res
      .status(200)
      .json(new ApiResponse(200, transactions, "Transactions history"));
  } catch (error) {
    throw new ApiError(500, `Error fetching history: ${error}`);
  }
});

//transaction history with filter
const filteredHistory = asyncHandler(async (req, res) => {
  const { historyStartDate, historyEndDate } = req.body;

  if (
    [historyStartDate, historyEndDate].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Date fields are empty");
  }

  try {
    const transactionHistory = await Transaction.find({
      user: req.session.user._id,
      transactionDate: {
        $gt: historyStartDate,
        $lt: historyEndDate,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, transactionHistory, "Transactions history"));
  } catch (error) {
    throw new ApiError(500, `Error fetching history: ${error}`);
  }
});

//delete a transaction
const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    res
      .send(200)
      .json(
        new ApiResponse(200, transaction, "Transaction deleted successfully")
      );
  } catch (error) {
    throw new ApiError(500, `Error deleting transaction: ${error}`);
  }
});

//update a transaction
const updateTransaction = asyncHandler(async (req, res) => {
  const { income, note, expense, transactionDate } = req.body;
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndUpdate(id, {
      income,
      note,
      expense,
      transactionDate,
    });
    res
      .status(200)
      .json(
        new ApiResponse(200, transaction, "Transaction updated successfully")
      );
  } catch (error) {
    throw new ApiError(500, `Error updating transaction: ${error}`);
  }
});

export {
  addExpense,
  history,
  filteredHistory,
  deleteTransaction,
  updateTransaction,
};
