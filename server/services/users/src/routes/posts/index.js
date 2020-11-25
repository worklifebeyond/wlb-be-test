const Controller = require('../../controllers/PostController');
const { authorization_post } = require('../../middlewares/authorization');

function postsRoute(router) {
  router
    .post('/posts', Controller.create)
    .get('/posts', Controller.read)
    .get('/posts/:id', Controller.findByPostId)
    .get('/posts/user/:id', Controller.findByUserId)
    // .use(authorization_post)
    .put('/posts/:id', authorization_post, Controller.update)
    .delete('/posts/:id', authorization_post, Controller.delete);
}

module.exports = postsRoute;
