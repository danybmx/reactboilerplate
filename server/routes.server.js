import users from './controllers/users';
import counter from './controllers/counter';

export default (router) => {
  // Users related
  router.route('/auth').post(users.auth.logginWithPassword);
  router.route('/auth/facebook').post(users.auth.logginWithFacebook);
  router.route('/auth/twitter').post(users.auth.logginWithTwitter);

  router.route('/counter')
    .get(counter.initialCount);

  return router;
};
