import dotenv from "dotenv";

import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import sessionMiddleware from "./middleware/session.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(sessionMiddleware);
app.use("", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
