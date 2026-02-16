import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";


export const passportConfig= ()=>{
    passport.use("local", new LocalStrategy(
      async function (username, password, done) {
        try {
          // Hardcoded credentials - no database
          if (username === "AsthaAdmin" && password === "atulparamjain") {
            console.log("User authenticated successfully");
            return done(null, { username: "AsthaAdmin" });
          } else {
            return done(null, false, { message: "Invalid credentials" });
          }
        }
        catch (error) {
          console.log(error);
          return done(error);
        }

      }));

}

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    // Find user by username and return user object
    done(null, { username });
});