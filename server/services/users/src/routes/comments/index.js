const Controller = require('../../controllers/CommentController');
const authentication = require('../../middlewares/authentication');
const { authorization_comment } = require('../../middlewares/authorization');

function commentsRoute(router) {
  router
    .post('/comments', authentication, Controller.create)
    .delete('/comments', authentication, authorization_comment, Controller.delete);
}

module.exports = commentsRoute;
