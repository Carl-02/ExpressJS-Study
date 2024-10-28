import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../util/MockupUsers.js";

passport.serializeUser((user, done) => {
  console.log("INSINDE SERIALIZEUSER");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("INSIDE DESERIALIZEUSER");
  console.log(`DESERIALIZEUSER ID: ${id}`);

  try {
    const findUser = users.find((user) => user.id === id);
    if (!findUser) throw new Error("USER NOT FOUND");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    try {
      const findUser = users.find((user) => user.username === username);
      if (!findUser) throw new Error("USER NOT FOUND");
      if (findUser.password !== password) throw new Error("INVALID CREDENTIALS");

      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
