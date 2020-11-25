const usersRoute = require('./users');
const postsRoute = require('./posts');
const likesRoute = require('./likes');
const commentsRoute = require('./comments');

function loadRoutes(router) {
  usersRoute(router);
  postsRoute(router);
  likesRoute(router);
  commentsRoute(router);
};

module.exports = loadRoutes;
