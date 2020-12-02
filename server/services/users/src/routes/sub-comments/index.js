const Controller = require('../../controllers/SubCommentController');
const authentication = require('../../middlewares/authentication');
const { authorization_sub_comment } = require('../../middlewares/authorization');

function commentsRoute(router) {
  router
    .post('/sub-comments', authentication, Controller.create)
    .delete('/sub-comments/:id', authentication, authorization_sub_comment, Controller.delete);
}

module.exports = commentsRoute;
