const express = require("express");
const passport = require("passport");
const GoogleStratgy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

const app = express();

passport.use(
  new GoogleStratgy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
     // console.log(profile)
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })  
);

app.get(
  "/auth/google/callback",
  passport.authenticate('google')
)

const PORT = process.env.PORT || 3000;
app.listen(PORT);
