import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import mongoose from 'mongoose';

// Config file
import config from '../config';

// Users controller
import users from '../server/controllers/users';

export default function (app) {
  const User = mongoose.model('User');

  // ---------
  // Configure passport
  // ---------
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // ---------
  // Configure local strategy
  // ---------
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    User.findOne({
      username,
    }, (err, user) => {
      if (err) {
        return done(err, false, {
          message: err.getMessage(),
        });
      }
      if (!user) {
        return done(null, false, {
          message: 'User not found',
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'Auth failed',
        });
      }
      return done(null, user);
    });
  }));

  // ---------
  // Configure twitter strategy
  // ---------
  passport.use(new TwitterStrategy({
    consumerKey: config.passport.twitter.consumerKey,
    consumerSecret: config.passport.twitter.consumerSecret,
    callbackURL: config.apiUrl + 'auth/twitter/callback',
    passReqToCallback: true,
  }, (req, token, tokenSecret, profile, done) => {
    // Login or register
    const providerData = profile._json;
    providerData.token = token;
    providerData.tokenSecret = tokenSecret;

    const providerUserProfile = {
      username: profile.username,
      profile: {
        displayName: profile.displayName,
      },
      provider: 'twitter',
      providerIdentifierField: 'id_str',
      providerData,
    };

    users.auth.saveOAuthUserProfile(req, providerUserProfile, done);
  }));

  // ---------
  // Configure facebook strategy
  // ---------
  passport.use(new FacebookStrategy({
    clientID: config.passport.facebook.clientID,
    clientSecret: config.passport.facebook.clientSecret,
    callbackURL: config.apiUrl + 'auth/facebook/callback',
    passReqToCallback: true,
  }, (req, accessToken, refreshToken, profile, done) => {
    // Login or register
    const providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

    const providerUserProfile = {
      username: profile.username,
      profile: {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      },
      provider: 'facebook',
      providerIdentifierField: 'id',
      providerData,
    };

    users.auth.saveOAuthUserProfile(req, providerUserProfile, done);
  }));

  app.use(passport.initialize());
  app.use(passport.session());
}
