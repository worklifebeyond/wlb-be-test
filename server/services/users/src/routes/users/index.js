const Controller = require('../../controllers/UserController');

function usersRoute(router) {
  router
    .get('/users', Controller.read)
    .post('/users/register', Controller.register)
    .get('/users/verify', Controller.verify)
    .post('/users/login', Controller.login);
};

module.exports = usersRoute;
