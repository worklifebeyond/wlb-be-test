const Controller = require('../../controllers/UserController');

function registerRoute(router) {
  router.get('/users/register', Controller.register);
  // router.post('/register', Controller.register);
};

module.exports = registerRoute;
