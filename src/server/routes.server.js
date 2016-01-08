import counter from './controllers/counter';

export default (router) => {
  router.route('/counter')
    .get(counter.initialCount);

  return router;
};
