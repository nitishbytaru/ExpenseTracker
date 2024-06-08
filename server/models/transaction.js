import mongoose from "mongoose";
import { Schema } from "mongoose";

const expenseSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  income: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    required: true,
  },
});

const Expense = mongoose.model("expense", expenseSchema);
export default Expense;
