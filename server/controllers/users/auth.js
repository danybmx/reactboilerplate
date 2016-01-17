import passport from 'passport';
import mongoose from 'mongoose';

export default {
  loginWithFacebook: (req, res, next) => {
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login',
    })(req, res, next);
  },
  loginWithTwitter: (req, res, next) => {
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login',
    })(req, res, next);
  },
  loginWithPassword: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
        return res.send({
          status: 'error',
          user: false,
          message: info.message,
        });
      }
      return res.send({
        status: 'success',
        user,
      });
    })(req, res, next);
  },
  logout: (req, res) => {
    req.logout();
    res.redirect('/');
  },
  saveOAuthUserProfile: (req, providerUserProfile, done) => {
    const User = mongoose.model('User');

    if (!req.user) {
      // Define search query
      const searchMainProviderIdentifierField =
        'providerData.' + providerUserProfile.providerIdentifierField;
      const searchAdditionalProviderIdentifierField =
        'additionalProvidersData.' + providerUserProfile.providerIdentifierField;

      // Define main provider search query
      const mainProviderSearchQuery = {};
      mainProviderSearchQuery.provider = providerUserProfile.provider;
      mainProviderSearchQuery[searchMainProviderIdentifierField] =
        providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

      // Define additional provider search query
      const additionalProvidersSearchQuery = {};
      additionalProvidersSearchQuery[searchAdditionalProviderIdentifierField] =
        providerUserProfile.providerData[providerUserProfile.providerIdentifierField];

      // Define a search query to find existing user with current provider profile
      const searchQuery = {
        $or: [mainProviderSearchQuery, additionalProvidersSearchQuery],
      };

      User.findOne(searchQuery, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          const possibleUsername =
            providerUserProfile.username || ((providerUserProfile.profile.email)
              ? providerUserProfile.profile.email.split('@')[0]
              : '');

          User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
            new User(Object.assign({}, providerUserProfile, { username: availableUsername }))
              .save((err, user) => {
                done(err, user);
              });
          });
        } else {
          return done(err, user);
        }
      });
    } else {
      // User is already logged in, join the provider data to the existing user
      const user = req.user;

      // Check if user exists, is not signed in using this provider
      if (
        user.rovider !== providerUserProfile.provider
        && (!user.additionalProvidersData
        || !user.additionalProvidersData[providerUserProfile.provider])) {
        // Then tell mongoose that we've updated the additionalProvidersData field
        user.markModified('additionalProvidersData');

        // And save the user
        user.save((err, user) => {
          return done(err, user, '/');
        });
      } else {
        return done(new Error('User is already connected using this provider'), user);
      }
    }
  },
};
