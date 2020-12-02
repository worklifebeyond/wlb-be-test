const { Post, User, Like, Comment, SubComment } = require('../models');
const { Op } = require('sequelize');
const errorHandler = require('../helpers/errorHandler');
const filterPost = require('../helpers/filterPost');
const log = require('../helpers/logger');

class PostController {
  static async create(ctx) {
    const start_time = Date.now();
    const UserId = ctx.user.id;
    if (ctx.request.body.title === undefined) {
      ctx.request.body.title = null;
    }
    if (ctx.request.body.content === undefined) {
      ctx.request.body.content = null;
    }
    const { title, content } = ctx.request.body;
    try {
      const new_post = await Post.create({ title, content, UserId });
      ctx.response.status = 201;
      ctx.response.body = new_post;
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

  static async read(ctx) {
    const start_time = Date.now();
    try {
      const all_posts = await Post.findAll({
        include: [{
          model: User,
        },
        {
          model: Like,
        },{
          model: Comment,
          include: [SubComment],
        }],
      });
      ctx.response.status = 200;
      ctx.response.body = all_posts;
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

  static async findByPostId(ctx) {
    const start_time = Date.now();
    const id = +ctx.request.params.id;
    try {
      const posts = await Post.findByPk(id, {
        include: [{
          model: User,
        },
        {
          model: Like,
        },{
          model: Comment,
          include: [SubComment],
        }],
      });
      ctx.response.status = 200;
      ctx.response.body = posts;
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

  static async findByUserId(ctx) {
    const start_time = Date.now();
    const id = +ctx.request.params.id;
    try {
      const posts = await Post.findAll({
        where: { UserId: id },
        include: [{
          model: User,
        },
        {
          model: Like,
        },{
          model: Comment,
          include: [SubComment],
        }],
      });
      ctx.response.status = 200;
      ctx.response.body = posts;
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

  static async search(ctx) {
    const start_time = Date.now();
    const { title, sort, order } = ctx.request.query;
    const sort_array = sort.split(',');
    const sort_order = filterPost(sort_array, order);
    try {
      const { count, rows: data } = await Post.findAndCountAll({
        where: {
          title: {
            [Op.iRegexp]: `${title}`,
          },
        },
        order: sort_order,
        include: [{
          model: User,
        },
        {
          model: Like,
        },{
          model: Comment,
          include: [SubComment],
        }],
      });
      ctx.response.status = 200;
      ctx.response.body = { count, data };
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

  static async update(ctx) {
    const start_time = Date.now();
    const id = +ctx.request.params.id;
    if (ctx.request.body.title === undefined) {
      ctx.request.body.title = null;
    }
    if (ctx.request.body.content === undefined) {
      ctx.request.body.content = null;
    }
    const { title, content } = ctx.request.body;
    try {
      const updated_post = await Post.update({ title, content },{
        where: { id },
        returning: true,
      });
      ctx.response.status = 200;
      ctx.response.body = updated_post[1][0];
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

  static async delete(ctx) {
    const start_time = Date.now();
    const id = +ctx.request.params.id;
    try {
      const deleted_post = await Post.findByPk(id);
      await Post.destroy({ where: { id } });
      ctx.response.status = 200;
      ctx.response.body = {
        message: 'Delete Post Success',
        deleted_post,
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

module.exports = PostController;
