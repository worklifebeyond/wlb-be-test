const Controller = require('../../controllers/UserController');

function usersRoute(router) {
  router.post('/users/register', Controller.register);
  router.get('/users/verify', Controller.verify);
  router.post('/users/login', Controller.login);
};

module.exports = usersRoute;
