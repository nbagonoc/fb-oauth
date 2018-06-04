const express = require("express");
const router = express.Router();
const passport = require("passport");

// GOOGLE STRATEGY
// GET | google auth login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// GET | redirect user after google oauth
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// FACEBOOK STRATEGY
// GET | facebook auth login
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// GET | redirect user after facebook oauth
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// TWITTER STRATEGY
// GET | twitter auth login
router.get("/twitter", passport.authenticate("twitter"));

// GET | redirect user after twitter oauth
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// GET | logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
