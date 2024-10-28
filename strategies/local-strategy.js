import passport from "passport"; // Importing Passport for authentication
import { Strategy } from "passport-local"; // Importing Local Strategy for username/password authentication
import { User } from "../mongoose/schemas/user.js"; // Importing User model from Mongoose schemas

// Serialize user to store user ID in the session
passport.serializeUser((user, done) => {
  console.log("INSIDE SERIALIZEUSER"); // Log message for debugging
  console.log(user); // Log the user object
  done(null, user.id); // Store the user's ID in the session
});

// Deserialize user from session to retrieve the user object
passport.deserializeUser(async (id, done) => {
  console.log("INSIDE DESERIALIZEUSER"); // Log message for debugging
  console.log(`DESERIALIZEUSER ID: ${id}`); // Log the user ID being deserialized

  try {
    const findUser = await User.findById(id); // Find user by ID
    if (!findUser) throw new Error("USER NOT FOUND"); // Throw error if user not found
    done(null, findUser); // Return the user object if found
  } catch (error) {
    done(error, null); // Return error if something goes wrong
  }
});

// Using the local strategy for authenticating users
export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username }); // Find user by username
      if (!findUser) throw new Error("USER NOT FOUND"); // Throw error if user not found
      if (findUser.password !== password) throw new Error("INVALID CREDENTIALS"); // Check if the password matches

      done(null, findUser); // Authentication successful, return the user object
    } catch (error) {
      done(error, null); // Return error if something goes wrong
    }
  })
);
