import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config();

const store = MongoStore.create({
  mongoUrl: `${process.env.MONGO_URL}/${DB_NAME}`,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSIONS", err);
});

const sessionOptions = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
};

const sessionMiddleware = session(sessionOptions);

export default sessionMiddleware;
