import { asyncHandler } from "../utils/asyncHandler.js";
import { Transaction } from "../models/transaction.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//add expense
const addExpense = asyncHandler(async (req, res) => {
  const { user, income, note, expense, transactionDate } = req.body;

  if (
    [user, income, note?.trim(), expense, transactionDate].some(
      (field) => field === ""
    )
  ) {
    res.status(400, "Please fill all fields");
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
      .json(
        new ApiResponse(201, transaction, "Transaction added successfully")
      );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding Transaction");
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
    res.status(500).send("Error fetching transactions history");
  }
});

//transaction history with filter
const filteredHistory = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body;

  if ([startDate, endDate].some((field) => field === "")) {
    res.status(400).send("Please fill all fields");
  }

  try {
    const transactionHistory = await Transaction.find({
      user: req.user._id,
      transactionDate: {
        $gt: startDate,
        $lt: endDate,
      },
    });
    res
      .status(200)
      .json(new ApiResponse(200, transactionHistory, "Transactions history"));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching transactions history");
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
    res.status(500).send("Error updating transaction");
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
    res.status(500).send("Error deleting transaction");
  }
});

export {
  addExpense,
  history,
  filteredHistory,
  deleteTransaction,
  updateTransaction,
};
