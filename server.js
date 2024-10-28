import express from "express";
import UserRouter from "./routes/userRoute.js";
import AuthRouter from "./routes/auth.js";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import "./strategies/local-strategy.js";

mongoose
  .connect("mongodb://localhost/study")
  .then(() => console.log("CONNECTED TO DATABASE"))
  .catch((err) => console.log(`ERROR: ${err}`));

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  session({
    secret: "carl",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(AuthRouter);
app.use(UserRouter);

app.listen(PORT, () => {
  console.log(`Server running in PORT http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  console.log(`SERVER IS RUNNING`);
});
