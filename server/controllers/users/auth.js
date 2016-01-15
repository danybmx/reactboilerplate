import passport from 'passport';

export default {
  logginWithFacebook: (req, res) => {
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/',
    });
  },
  logginWithTwitter: (req, res) => {
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/',
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
