import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import sessionMiddleware from "./middleware/session.js";
import cors from "cors";

dotenv.config();

const app = express();


To ensure your front-end application communicates correctly with your back-end server and to resolve CORS issues during deployment, follow these steps:

1. Ensure Environment Variable Configuration
You should use environment variables to handle the API URL dynamically based on the environment (development or production).

Create a .env file in your client directory with the following content:

plaintext
Copy code
VITE_API_URL=https://your-backend-url.vercel.app
Replace https://your-backend-url.vercel.app with the actual URL of your deployed back-end.

2. Update expenseApi.js to Use Environment Variable
Update your API file to use this environment variable:

javascript
Copy code
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// api for fetching the expense history
export const getHistory = async () => {
  try {
    return await axios.get(`${API_URL}/history`, { withCredentials: true });
  } catch (error) {
    console.log(error);
    return error;
  }
};

// api for fetching the expense history with the date filter
export const getFilteredHistory = async (data) => {
  try {
    return await axios.post(`${API_URL}/filteredHistory`, data, { withCredentials: true });
  } catch (error) {
    console.log(error);
    return error;
  }
};

// api for sending form data
export const addExpense = async (Data) => {
  try {
    await axios.post(`${API_URL}/expense`, Data, { withCredentials: true });
  } catch (error) {
    console.log(error);
    return error;
  }
};

// api to delete transaction
export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/deleteTransaction/${id}`, { withCredentials: true });
  } catch (error) {
    console.log(error);
    return error;
  }
};

// api to update transaction
export const updateTransaction = async (id, Data) => {
  try {
    const { income, note, expense, transactionDate } = Data;
    await axios.put(`${API_URL}/updateTransaction/${id}`, {
      income: parseInt(income),
      note,
      expense: parseInt(expense),
      transactionDate,
    }, { withCredentials: true });
  } catch (error) {
    console.log(error);
    return error;
  }
};
3. Ensure CORS Configuration in Backend
Make sure your backend CORS configuration allows credentials and has the correct origin:

javascript
Copy code
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import sessionMiddleware from "./middleware/session.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(sessionMiddleware);
app.use("", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
