import passport from "passport";
import Strategy from "passport-discord";
import { DiscordUser } from "../mongoose/schemas/discordUser.js";

passport.serializeUser((user, done) => {
  done(null, user.discordId); // Store the Discord ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await DiscordUser.findOne({ discordId: id });
    done(null, user); // Pass the user object to the done callback
  } catch (error) {
    done(error, null); // Handle errors during deserialization
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: "1300803801116053585",
      clientSecret: "49dGIGF99rEXDhgi7fZEpf8i5Gafjfmb",
      callbackURL: "http://localhost:3000/api/auth/discord/redirect",
      scope: ["identify"],
    },
    async (acessToken, refreshToken, profile, done) => {
      const findUser = await DiscordUser.findOne({ discordId: profile.id });
      try {
        if (!findUser) {
          const newUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id,
          });
          const newUserSaved = await newUser.save();
          return done(null, newUserSaved);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);
