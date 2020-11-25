const Controller = require('../../controllers/PostController');
const authentication = require('../../middlewares/authentication');
const { authorization_post } = require('../../middlewares/authorization');

function postsRoute(router) {
  router
    .post('/posts', authentication, Controller.create)
    .get('/posts', Controller.read)
    .get('/posts/:id', Controller.findByPostId)
    .get('/posts/user/:id', Controller.findByUserId)
    .put('/posts/:id', authentication, authorization_post, Controller.update)
    .delete('/posts/:id', authentication, authorization_post, Controller.delete);
}

module.exports = postsRoute;
