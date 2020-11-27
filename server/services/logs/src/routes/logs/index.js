const Controller = require('../../controllers/LogController');

function logsRoute(router) {
  router
    .post('/logs', Controller.create)
    .get('/logs', Controller.read)
    .delete('/logs/:id', Controller.delete)
    .delete('/logs', Controller.reset);
};

module.exports = logsRoute;
