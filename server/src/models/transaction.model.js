import mongoose from "mongoose";
import { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["expense", "income"],
      required: true,
    },
    transactionValue: {
      type: Number,
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export { Transaction };
