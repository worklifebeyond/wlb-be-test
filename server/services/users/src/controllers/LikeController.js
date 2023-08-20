const { Like, Post, User } = require('../models');
const errorHandler = require('../helpers/errorHandler');
const sendEmail = require('../helpers/mailgun');
const log = require('../helpers/logger');

class LikeController {
  static async create(ctx) {
    const start_time = Date.now();
    const UserId = ctx.user.id;
    if (ctx.request.body.PostId === undefined) {
      ctx.request.body.PostId = null;
    }
    const { PostId } = ctx.request.body;
    try {
      const like = await Like.findOne({
        where: { PostId, UserId }
      });
      if (!like) {
        const post = await Post.findByPk(PostId, { include: [User] });
        if (!post) {
          throw new Error('The post does not exist.');
        } else {
          const like = await Like.create({ PostId, UserId });
          ctx.response.status = 201;
          ctx.response.body = like;
          log(
            `${ctx.request.host}${ctx.request.url}`,
            null,
            ctx.request.header.access_token,
            start_time,
            ctx.request,
            ctx.response,
          );

          // Send email with Mailgun API :
          const email_data = {
            from: `Blog App Team <alf.tirta@gmail.com>`,
            to: `${post.User.email}`,
            subject: `Blog App - Notification`,
            text: `Hello, ${post.User.username}.

Someone just liked your post entitled "${post.title}".`,
          };
          sendEmail(email_data);
        }
      } else {
        throw new Error('You cannot give more than one like for the same post.');
      }
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
      log(
        `${ctx.request.host}${ctx.request.url}`,
        null,
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
      const deleted_like = await Like.findByPk(id);
      await Like.destroy({ where: { id } });
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Delete Like Success',
        deleted_like,
      };
      log(
        `${ctx.request.host}${ctx.request.url}`,
        null,
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
        null,
        ctx.request.header.access_token,
        start_time,
        ctx.request,
        ctx.response,
      );
    }
  }
}

module.exports = LikeController;
