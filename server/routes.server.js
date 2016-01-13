import users from './controllers/users';
import counter from './controllers/counter';

export default (router) => {
  // Users related
  router.route('/auth/facebook', users.auth.logginWithFacebook);

  router.route('/counter')
    .get(counter.initialCount);

  return router;
};
