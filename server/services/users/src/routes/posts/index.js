const Controller = require('../../controllers/PostController');
const authentication = require('../../middlewares/authentication');

function postsRoute(router) {
  router
    .use(authentication)
    .post('/posts', Controller.create)
    .get('/posts', Controller.read)
    .get('/posts/:id', Controller.findByPostId)
    .get('/posts/user/:id', Controller.findByUserId)
    .put('/posts/:id', Controller.update)
    .delete('/posts/:id', Controller.delete);
}

module.exports = postsRoute;
