import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy.js";
const router = Router();

//LOGIN
router.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

//CHECK LOGIN STATUS IF AUTHENTICATE
router.get("/api/auth/status", (req, res) => {
  console.log("INSIDE /auth/status endpoint");
  console.log(req.user);

  req.user ? res.send(req.user) : res.sendStatus(401);
});

//LOGOUT SESSION AND PASSPORT
router.post("/api/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);

  req.logout((err) => {
    if (err) return res.sendStatus(401);

    res.send(200);
  });
});

export default router;
