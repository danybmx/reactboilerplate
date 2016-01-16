import passport from 'passport';

export default {
  logginWithFacebook: (req, res) => {
    passport.authenticate('facebook', {
      successRedirect: '/api/auth/facebook',
      failureRedirect: '/api/auth/facebook',
    });
  },
  logginWithTwitter: (req, res) => {
    passport.authenticate('twitter', {
      successRedirect: '/api/auth/twitter',
      failureRedirect: '/api/auth/twitter',
    });
  },
  logginWithPassword: (req, res) => {
    res.send(JSON.stringify({
      user: {
        username: req.body.username,
        password: req.body.password,
      },
    }));
  },
};
