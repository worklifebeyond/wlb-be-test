const registerRoute = require('./register');

function loadRoutes(router) {
  registerRoute(router);
};

module.exports = loadRoutes;
