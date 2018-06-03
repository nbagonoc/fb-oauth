const express = require("express");
const router = express.Router();
const passport = require("passport");

// GET | faecbook auth login
router.get("/facebook", passport.authenticate("facebook"));

// GET | redirect user after facebook oauth
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
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
