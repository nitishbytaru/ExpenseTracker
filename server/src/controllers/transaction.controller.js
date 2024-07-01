import { asyncHandler } from "../utils/asyncHandler.js";
import { Transaction } from "../models/transaction.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//add expense
const addExpense = asyncHandler(async (req, res) => {
  const { user, income, note, expense, transactionDate } = req.body;

  if (
    [user, income, note?.trim(), expense, transactionDate].some(
      (field) => field === ""
    )
  ) {
    throw new ApiError(400, " Please fill all fields");
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
    throw new ApiError(500, error?.message || "Error adding expense");
  }
});

//transaction history
const history = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    });
    res
      .status(200)
      .json(new ApiResponse(200, transactions, "Transactions history sent"));
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Error fetching transactions history"
    );
  }
});

//transaction history with filter
const filteredHistory = asyncHandler(async (req, res) => {
  const { historyStartDate, historyEndDate } = req.body;

  if ([historyStartDate, historyEndDate].some((field) => field === "")) {
    throw new ApiError(400, "Date fields are empty");
  }

  try {
    const transactionHistory = await Transaction.find({
      user: req.user._id,
      transactionDate: {
        $gt: historyStartDate,
        $lt: historyEndDate,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, transactionHistory, "Transactions history"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error fetching transactions history");
  }
});

//update a transaction
const updateTransaction = asyncHandler(async (req, res) => {
  const { income, note, expense, transactionDate } = req.body;
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      {
        income,
        note,
        expense,
        transactionDate,
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json(
        new ApiResponse(200, transaction, "Transaction updated successfully")
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error updating transaction");
  }
});

//delete a transaction
const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndDelete(id);

    res
      .status(200)
      .json(
        new ApiResponse(200, transaction, "Transaction deleted successfully")
      );
  } catch (error) {
    throw new ApiError(500, error?.message || "Error deleting transaction");
  }
});

export {
  addExpense,
  history,
  filteredHistory,
  deleteTransaction,
  updateTransaction,
};
