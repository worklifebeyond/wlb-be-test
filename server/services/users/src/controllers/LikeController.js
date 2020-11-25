const { Like, Post, User } = require('../models');
const errorHandler = require('../helpers/errorHandler');

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
        const post = await Post.findByPk(PostId);
        if (!post) {
          throw new Error('The post does not exist.');
        } else {
          const like = await Like.create({ PostId, UserId });
          ctx.response.status = 201;
          ctx.response.body = like;
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
