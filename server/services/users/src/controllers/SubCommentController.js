const { SubComment, Comment, User, Post } = require('../models');
const errorHandler = require('../helpers/errorHandler');
const sendEmail = require('../helpers/mailgun');
const log = require('../helpers/logger');

class SubCommentController {
  static async create(ctx) {
    const start_time = Date.now();
    const UserId = ctx.user.id;
    if (ctx.request.body.content === undefined) {
      ctx.request.body.content = null;
    }
    if (ctx.request.body.CommentId === undefined) {
      ctx.request.body.CommentId = null;
    }
    const { content, CommentId } = ctx.request.body;
    try {
      const comment = await Comment.findByPk(CommentId, { include: [User, Post] });
      if (!comment && content && PostId) {
        throw new Error('The comment does not exist.');
      } else {
        const sub_comment = await SubComment.create({ content, CommentId, UserId });
        ctx.response.status = 201;
        ctx.response.body = sub_comment;
        log(
          `${ctx.request.host}${ctx.request.url}`,
          ctx.request.header.access_token,
          start_time,
          ctx.request,
          ctx.response,
        );

        // Send email with Mailgun API :
        const email_data = {
          from: `Blog App Team <alf.tirta@gmail.com>`,
          to: `${comment.User.email}`,
          subject: `Blog App - Notification`,
          text: `Hello, ${comment.User.username}.

Someone just commented "${sub_comment.content}" on your comment "${comment.content}" from a post entitled "${comment.Post.title}".`,
        };
        sendEmail(email_data);
      }
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
      log(
        `${ctx.request.host}${ctx.request.url}`,
        ctx.request.header.access_token,
        start_time,
        ctx.request,
        ctx.response,
      );
    }
  }

  static async delete(ctx) {
    const start_time = Date.now();
    const id = +ctx.request.params.id;
    try {
      const deleted_sub_comment = await SubComment.findByPk(id);
      await SubComment.destroy({ where: { id }});
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Delete Sub Comment Success',
        deleted_sub_comment,
      };
      log(
        `${ctx.request.host}${ctx.request.url}`,
        ctx.request.header.access_token,
        start_time,
        ctx.request,
        ctx.response,
      );
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
      log(
        `${ctx.request.host}${ctx.request.url}`,
        ctx.request.header.access_token,
        start_time,
        ctx.request,
        ctx.response,
      );
    }
  }
}

module.exports = SubCommentController;
