import { Router } from "express"; // Importing Router from Express framework
import { User } from "../mongoose/schemas/user.js"; // Importing User model from Mongoose schemas
const router = Router(); // Creating an instance of the Router

// GET ALL USERS IN DATABASE
router.get("/api/users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    res.status(200).json(users); // Send a successful response with the list of users
  } catch (error) {
    console.log(`ERROR: ${error}`); // Log any errors that occur
  }
});

// GET SPECIFIC USERS IN DATABASE USING ID
router.get("/api/users/:id", async (req, res) => {
  const userID = req.params.id; // Extract user ID from request parameters
  const user = await User.findById(userID); // Find the user by ID

  // If user is not found, return a 400 status with a message
  if (!user) {
    return res.status(400).send({ Message: "User Not Found" });
  }

  res.status(200).json(user); // Send the found user as a response
});

// POST USERS TO DATABASE
router.post("/api/users", async (req, res) => {
  const { body } = req; // Get the request body

  try {
    // Create a new user instance
    const newUser = new User(body);
    const saveUser = await newUser.save(); // Save the user to the database

    return res.status(201).send(saveUser); // Send a 201 response for resource creation
  } catch (error) {
    console.log(`ERROR: ${error}`); // Log any errors that occur
    res.sendStatus(401); // Send a 401 status in case of an error
  }

  res.status(200).json("ADD SUCESSFULLY"); // This line is unreachable due to the return statement above
});

// DELETE USERS IN DATABASE
router.delete("/api/users/:id", async (req, res) => {
  const userID = req.params.id; // Extract user ID from request parameters
  const user = await User.findByIdAndDelete(userID); // Delete the user by ID
  res.status(200).json({ Message: "Delete Sucessfully" }); // Send a success message
});

// UPDATE USERS IN DATABASE
router.patch("/api/users/:id", async (req, res) => {
  const { body } = req; // Get the request body
  const userID = req.params.id; // Extract user ID from request parameters

  const user = await User.findByIdAndUpdate(userID, body); // Update the user with the new data
  res.status(200).json({ Message: "Update Sucessfully", user: user }); // Send the updated user as a response
});

export default router; // Export the router to be used in other parts of the application
