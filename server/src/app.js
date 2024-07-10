import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use(
//   cors({
//     origin: "https://expensetrackerclient.vercel.app",
//     credentials: true,
//   })
// );
app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes importing
import userRouter from "./routes/user.router.js";
import transactionRouter from "./routes/transaction.router.js";

//routes declerations
app.get("/api",(req,res)=>{res.send("home")})
app.get("/",(req,res)=>{res.send("no no")})
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", transactionRouter);

export { app };
