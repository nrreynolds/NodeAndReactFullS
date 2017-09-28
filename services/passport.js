const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {        //  this is what we just pulled out of the DB
  done(null, user.id);                              //  the second argument is the id the DB issues b/c they might sign in with different accounts
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null,user);
  });                                  // after we find a user we will call done
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })  // returns a promise that returns code
        .then((existingUser) => {
          if (existingUser) {
            // we already have a record with the given profile id
            done(null, existingUser);
          } else {
            // we dont have a user record with this id,  make new record
            new User({ googleId: profile.id })  // creates mongoose model instance
            .save()             // will save to the database
            .then(user => done(null, user));
          }
        });
    }
  )
);
