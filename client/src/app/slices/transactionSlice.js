import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: new Date().toISOString(),
  inputDate: {
    startDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ).toISOString(),
    endDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).toISOString(),
  },
  transactionHistory: [],
  formType: "income",
  selectedGoal: null,
  inputTransactionData: {
    // Add this if it doesn't exist
    note: "",
    transactionValue: 0,
    transactionType: "income",
    transactionDate: new Date().toISOString(),
    category: "need", // example default
  },
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setInputDate: (state, action) => {
      state.inputDate = action.payload;
    },
    setTransactionHistory: (state, action) => {
      state.transactionHistory = action.payload;
    },
    setFormType: (state, action) => {
      state.formType = action.payload;
    },
    setSelectedGoal: (state, action) => {
      state.selectedGoal = action.payload;
    },
    setInputTransactionData: (state, action) => {
      state.inputTransactionData = {
        ...state.inputTransactionData,
        ...action.payload,
      };
    }, // Add this
  },
});

export const {
  setStartDate,
  setInputDate,
  setTransactionHistory,
  setFormType,
  setSelectedGoal,
  setInputTransactionData,
} = transactionSlice.actions;

export default transactionSlice.reducer;
