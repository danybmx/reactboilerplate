import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';

import config from '../config';

export default function (passport) {
  // ---------
  // Configure local strategy
  // ---------
  passport.use(new LocalStrategy((username, password, done) => {
    done(null, {});
  }));

  // ---------
  // Configure twitter strategy
  // ---------
  passport.use(new TwitterStrategy({
    consumerKey: config.passport.twitter.consumerKey,
    consumerSecret: config.passport.twitter.consumerSecret,
    callbackURL: config.apiUrl + '/auth/twitter/callback',
  }, (token, tokenSecret, profile, done) => {
    // Login or register
    done(null, {});
  }));

  // ---------
  // Configure facebook strategy
  // ---------
  passport.use(new FacebookStrategy({
    clientID: config.passport.twitter.consumerKey,
    clientSecret: config.passport.twitter.consumerSecret,
    callbackURL: config.apiUrl + '/auth/facebook/callback',
  }, (accessToken, refreshToken, profile, done) => {
    // Login or register
    done(null, {});
  }));
}
