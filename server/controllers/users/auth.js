import passport from 'passport';

export default {
  logginWithFacebook: () => {
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/',
    });
  },
  logginWithTwitter: () => {

  },
  logginWithUser: () => {

  },
};
