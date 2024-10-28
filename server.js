import express from "express";
import UserRouter from "./routes/userRoute.js";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.js";

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
app.use(UserRouter);

app.listen(PORT, () => {
  console.log(`Server running in PORT http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  console.log(`SERVER IS RUNNING`);
});

//LOGIN
app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

//CHECK LOGIN STATUS IF AUTHENTICATE
app.get("/api/auth/status", (req, res) => {
  console.log("INSIDE /auth/status endpoint");
  console.log(req.user);

  req.user ? res.send(req.user) : res.sendStatus(401);
});

//LOGOUT SESSION AND PASSPORT
app.post("/api/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);

  req.logout((err) => {
    if (err) return res.sendStatus(401);

    res.send(200);
  });
});
