const usersRoute = require('./users');
const postsRoute = require('./posts');
const likesRoute = require('./likes');
const authentication = require('../middlewares/authentication');

function loadRoutes(router) {
  usersRoute(router);
  router.use(authentication);
  postsRoute(router);
  likesRoute(router);
};

module.exports = loadRoutes;
