const Controller = require('../../controllers/LikeController');
const authentication = require('../../middlewares/authentication');
const { authorization_like } = require('../../middlewares/authorization');

function likesRoute(router) {
  router
    .post('/likes', authentication, Controller.create)
    .delete('/likes/:id', authentication, authorization_like, Controller.delete);
}

module.exports = likesRoute;
