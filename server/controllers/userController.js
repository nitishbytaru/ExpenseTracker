import Expense from "../models/transaction.js";
import User from "../models/users.js";

//add expense
export const addExpense = async (req, res) => {
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
};

//transaction history
export const history = async (req, res) => {
  try {
    const expensesHistory = await Expense.find({
      user: req.session.user._id,
    });
    res.status(200).send(expensesHistory);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).send("Internal Server Error");
  }
};

//delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    await Expense.deleteOne({ _id: req.params.id });
    res.status(200).send("Transaction deleted successfully");
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).send("Internal Server Error");
  }
};

//delete a transaction
export const updateTransaction = async (req, res) => {
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
};

//expense analysis
export const analysis = async (req, res) => {
  try {
    const totalIncome = await Expense.find({ transactiontype: "income" });
    const totalExpense = await Expense.find({ transactiontype: "expense" });
    res.status(200).send({ totalIncome, totalExpense });
  } catch (error) {
    console.error("Error fetching analysis:", error);
    res.status(500).send("Internal Server Error");
  }
};

//register user
export const register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existingUser = await User.find({ email });
    if (!existingUser.length) {
      const newuser = new User({
        username,
        email,
        password,
      });
      await newuser.save();
      res.status(201).send("User registered successfully");
    } else {
      res.status(400).send("User already exists");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
};

//login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
        req.session.user = user;
        res.status(200).send("Login successful");
      } else {
        res.status(401).send("Invalid email or password");
      }
    } else {
      res.status(500).send("User dosenot exist");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error");
  }
};

//logout user
export const logout = async (req, res) => {
  if (req.session && req.session.user) {
    delete req.session.user;
  }
  res.status(200).send("Logged out successfully");
};

//user profile
export const profile = (req, res) => {
  try {
    if (req.session && req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(401).send("Not logged in");
    }
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).send("Internal Server Error");
  }
};

//edit the details of user profile details
export const updateProfileData = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await User.updateOne(
      {
        _id: req.session.user._id,
      },
      { $set: { username, email, password } }
    );
    req.session.user = await User.findOne({ _id: req.session.user._id });
    res.status(200).send("Data updated successfully");
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).send("Internal Server Error");
  }
};

//this route is used to delete the current user
export const deleteAccount = async (req, res) => {
  try {
    await Expense.deleteMany({
      user: req.session.user._id,
    });
    await User.deleteOne({
      _id: req.session.user._id,
    });
    res.status(200).send("User delted successfully");
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default {
  addExpense,
  history,
  analysis,
  register,
  login,
  logout,
  profile,
  updateProfileData,
  deleteAccount,
  deleteTransaction,
  updateTransaction,
};
