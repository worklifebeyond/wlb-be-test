const UserController = require('../../controllers/UserController');

function registerRoute(router) {
  router.get('/register', UserController.register);
  // router.post('/register', UserController.register);
};

module.exports = registerRoute;
