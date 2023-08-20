const usersRoute = require('./users');
const postsRoute = require('./posts');
const likesRoute = require('./likes');
const commentsRoute = require('./comments');
const subCommentsRoute = require('./sub-comments');

function loadRoutes(router) {
  usersRoute(router);
  postsRoute(router);
  likesRoute(router);
  commentsRoute(router);
  subCommentsRoute(router);
};

module.exports = loadRoutes;
