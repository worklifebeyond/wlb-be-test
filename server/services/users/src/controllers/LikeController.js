const { Like, Post, User } = require('../models');
const errorHandler = require('../helpers/errorHandler');
const sendEmail = require('../helpers/mailgun');

class LikeController {
  static async create(ctx) {
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
    }
  }

  static async delete(ctx) {
    const id = +ctx.request.params.id;
    try {
      const deleted_like = await Like.findByPk(id);
      await Like.destroy({ where: { id } });
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Delete Success',
        deleted_like,
      };
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
}

module.exports = LikeController;
