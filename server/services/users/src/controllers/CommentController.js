const { Comment, Post, User } = require('../models');
const errorHandler = require('../helpers/errorHandler');
const sendEmail = require('../helpers/mailgun');

class CommentController {
  static async create(ctx) {
    const UserId = ctx.user.id;
    if (ctx.request.body.content === undefined) {
      ctx.request.body.content = null;
    }
    if (ctx.request.body.PostId === undefined) {
      ctx.request.body.PostId = null;
    }
    const { content, PostId } = ctx.request.body;
    try {
      const post = await Post.findByPk(PostId, { include: [User] });
      if (!post && content && PostId) {
        throw new Error('The post does not exist.');
      } else {
        const comment = await Comment.create({ content, PostId, UserId });
        ctx.response.status = 201;
        ctx.response.body = comment;

        // Send email with Mailgun API :
        const email_data = {
          from: `Blog App Team <alf.tirta@gmail.com>`,
          to: `${post.User.email}`,
          subject: `Blog App - Notification`,
          text: `Hello, ${post.User.username}.

Someone just commented "${comment.content}" on your post entitled "${post.title}".`,
        };
        sendEmail(email_data);
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
      const deleted_comment = await Comment.findByPk(id);
      await Comment.destroy({ where: { id }});
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Delete Comment Success',
        deleted_comment,
      };
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
}

module.exports = CommentController;
