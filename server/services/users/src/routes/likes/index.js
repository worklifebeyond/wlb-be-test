const Controller = require('../../controllers/LikeController');
const { authorization_like } = require('../../middlewares/authorization');

function likesRoute(router) {
  router
    .post('/likes', Controller.create)
    .delete('/likes/:id', authorization_like, Controller.delete);
}

module.exports = likesRoute;
