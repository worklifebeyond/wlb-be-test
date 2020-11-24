const { Post, User, Like, Comment } = require('../models');
const errorHandler = require('../helpers/errorHandler');

class PostController {
  static async create(ctx) {
    const { title, content } = ctx.request.body;
    const UserId = ctx.user.id;
    try {
      const new_post = await Post.create({ title, content, UserId });
      ctx.response.status = 201;
      ctx.body = new_post;
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.body = errors;
    }
  }

  static async read(ctx) {
    try {
      const all_posts = await Post.findAll({ include: [User, Like, Comment] });
      ctx.response.status = 200;
      ctx.body = all_posts;
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.body = errors;
    }
  }

  static async findByPostId(ctx) {
    const id = +ctx.request.params.id;
    try {
      const posts = await Post.findByPk(id, {
        include: [User, Like, Comment],
      });
      ctx.response.status = 200;
      ctx.body = posts;
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.body = errors;
    }
  }

  static async findByUserId(ctx) {
    const id = +ctx.request.params.id;
    try {
      const posts = await Post.findAll({
        where: { UserId: id },
        include: [User, Like, Comment],
      });
      ctx.response.status = 200;
      ctx.body = posts;
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.body = errors;
    }
  }

  static async update(ctx) {
    const id = +ctx.request.params.id;
    const { title, content } = ctx.request.body;
    try {
      const updated_post = await Post.update({ title, content },{
        where: { id },
        returning: true,
      });
      ctx.response.status = 200;
      ctx.body = updated_post[1][0];
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.body = errors;
    }
  }

  static async delete(ctx) {
    const id = +ctx.request.params.id;
    try {
      const deleted_post = await Post.findByPk(id);
      await Post.destroy({ where: { id } });
      ctx.response.status = 200;
      ctx.body = deleted_post;
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.body = errors;
    }
  }
}

module.exports = PostController;