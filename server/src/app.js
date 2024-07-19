import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "https://expense-nd-trackers.netlify.app",
    // origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes importing
import userRouter from "./routes/user.router.js";
import transactionRouter from "./routes/transaction.router.js";
import goalRouter from "./routes/goal.router.js";

//routes declerations
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/goal", goalRouter);

export { app };
