import { asyncHandler } from "../utils/asyncHandler";

//add expense
const addExpense = asyncHandler(async (req, res) => {
  const { user, income, note, expense, transactionDate } = req.body;
  try {
    const newexpense = new Expense({
      user,
      income,
      note,
      expense,
      transactionDate,
    });
    await newexpense.save();
    res.status(201).send("Expense added successfully");
  } catch (error) {
    console.error("Error adding expense", error);
    res.status(500).send("internal server Error");
  }
});

//transaction history
const history = asyncHandler(async (req, res) => {
  try {
    const expensesHistory = await Expense.find({
      user: req.session.user._id,
    });
    res.status(200).send(expensesHistory);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).send("Internal Server Error");
  }
});

//transaction history with filter
const filteredHistory = asyncHandler(async (req, res) => {
  try {
    const { historyStartDate, historyEndDate } = req.body;
    const expensesHistory = await Expense.find({
      user: req.session.user._id,
      transactionDate: {
        $gt: historyStartDate,
        $lt: historyEndDate,
      },
    });
    res.status(200).send(expensesHistory);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).send("Internal Server Error");
  }
});

//delete a transaction
const deleteTransaction = asyncHandler(async (req, res) => {
  try {
    await Expense.deleteOne({ _id: req.params.id });
    res.status(200).send("Transaction deleted successfully");
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).send("Internal Server Error");
  }
});

//update a transaction
const updateTransaction = asyncHandler(async (req, res) => {
  try {
    const { income, note, expense, transactionDate } = req.body;
    await Expense.updateOne(
      {
        _id: req.params.id,
      },
      { $set: { income, note, expense, transactionDate } }
    );
    res.status(200).send("Transaction updated successfully");
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).send("Internal Server Error");
  }
});

export {
  addExpense,
  history,
  filteredHistory,
  deleteTransaction,
  updateTransaction,
};
