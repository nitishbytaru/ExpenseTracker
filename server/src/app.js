import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import flash from "connect-flash";

const app = express();

app.use(
  cors({
    // origin: "https://expense-nd-trackers.netlify.app",
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//sessions related code
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));

// routes importing
import userRouter from "./routes/user.router.js";
import transactionRouter from "./routes/transaction.router.js";
import goalRouter from "./routes/goal.router.js";
import { User } from "./models/user.model.js";
import { isAuthenticated } from "./middleware/auth.middleware.js";

//passport.js for auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//please remove the toast and used flase-messages insted
app.use(flash());

//routes declerations
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", isAuthenticated, transactionRouter);
app.use("/api/v1/goal", isAuthenticated, goalRouter);

export { app };
