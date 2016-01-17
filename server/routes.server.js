import users from './controllers/users';
import counter from './controllers/counter';

export default (router) => {
  // Users related
  router.route('/auth/facebook*').get(users.auth.loginWithFacebook);
  router.route('/auth/twitter*').get(users.auth.loginWithTwitter);
  router.route('/auth').post(users.auth.loginWithPassword);
  router.route('/logout').get(users.auth.logout);

  router.route('/counter')
    .get(counter.initialCount);

  return router;
};
