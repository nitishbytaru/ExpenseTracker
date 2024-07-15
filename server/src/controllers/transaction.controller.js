import { asyncHandler } from "../utils/asyncHandler.js";
import { Transaction } from "../models/transaction.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//add expense
const addTransaction = asyncHandler(async (req, res) => {
  const {
    user,
    note,
    category,
    transactionType,
    transactionValue,
    transactionDate,
  } = req.body;

  if (
    [
      user,
      note?.trim(),
      transactionDate,
      transactionType,
      category,
      transactionValue,
    ].some((field) => field === "")
  ) {
    res.status(400, "Please fill all fields");
  }

  try {
    const transaction = await Transaction.create({
      user,
      note,
      transactionType,
      category,
      transactionValue: parseInt(transactionValue),
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
  const { category, note, transactionType, transactionValue, transactionDate } =
    req.body;
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      {
        note,
        category,
        transactionType,
        transactionValue,
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
  addTransaction,
  history,
  filteredHistory,
  deleteTransaction,
  updateTransaction,
};
