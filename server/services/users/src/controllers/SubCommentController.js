const { SubComment, Comment, User } = require('../models');
const errorHandler = require('../helpers/errorHandler');

class SubCommentController {
  static async create(ctx) {
    const UserId = ctx.user.id;
    if (ctx.request.body.content === undefined) {
      ctx.request.body.content = null;
    }
    if (ctx.request.body.CommentId === undefined) {
      ctx.request.body.CommentId = null;
    }
    const { content, CommentId } = ctx.request.body;
    try {
      const comment = await Comment.findByPk(CommentId);
      if (!comment && content && PostId) {
        throw new Error('The comment does not exist.');
      } else {
        const sub_comment = await SubComment.create({ content, CommentId, UserId });
        ctx.response.status = 201;
        ctx.response.body = sub_comment;
      }
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }

  static async delete(ctx) {
    const id = +ctx.request.params.id;
    try {
      const deleted_sub_comment = await SubComment.findByPk(id);
      await SubComment.destroy({ where: { id }});
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Delete Success',
        deleted_sub_comment,
      };
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
}

module.exports = SubCommentController;
