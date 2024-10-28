import { Router } from "express";
import { users } from "../util/MockupUsers.js";
const router = Router();
router.get("/api/users", (req, res) => {
  res.status(200).send(users);
});

router.get("/api/users/:id", (req, res) => {
  const userID = parseInt(req.params.id);

  const user = users.find((user) => user.id === userID);

  if (!user) {
    return res.status(400).send({ Message: "User Not Found" });
  }

  res.status(200).send(user);
});

router.post("/api/users", (req, res) => {
  const { body } = req;

  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

  const newUser = { id: newId, ...body };

  users.push(newUser);

  res.status(200).json("ADD SUCESSFULLy");
});

router.delete("/api/users/:id", (req, res) => {
  const userID = parseInt(req.params.id);

  const userIndex = users.findIndex((user) => user.id === userID);

  users.splice(userIndex, 1);

  res.status(200).json({ Message: "Delete Sucessfully" });
});

router.patch("/api/users/:id", (req, res) => {
  const { body } = req;
  const userID = parseInt(req.params.id);

  const userIndex = users.findIndex((user) => user.id === userID);

  users[userIndex] = { ...users[userIndex], ...body };

  res.status(200).json({ Message: "Update Sucessfully", user: users[userIndex] });
});

export default router;
