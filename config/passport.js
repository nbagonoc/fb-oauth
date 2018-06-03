const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("./db_secret_key");
const User = mongoose.model("users");

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: keys.fbAppID,
        clientSecret: keys.fbAppSecret,
        callbackURL: "/auth/facebook/callback",
        // profileFields: ["id", "displayName", "photos", "email"],
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        // console.log(profile);

        // remove characters after reaching '?'
        // const image = profile.photos[0].value.substring(
        //   0,
        //   profile.photos[0].value.indexOf("?")
        // );
        const newUser = {
          facebookID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value
          // image
        };
        // check for existing user
        User.findOne({
          facebookID: profile.id
        }).then(user => {
          if (user) {
            // return user
            done(null, user);
          } else {
            // create user
            new User(newUser).save().then(user => done(null, user));
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
};
