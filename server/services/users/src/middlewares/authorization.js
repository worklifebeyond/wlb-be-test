const { User, Post, Like, Comment, SubComment } = require('../models');
const { verify_jwt_token } = require('../helpers/jwt');
const errorHandler = require('../helpers/errorHandler');
const log = require('../helpers/logger');

// authorization check before updating or deletinga post :
async function authorization_post(ctx, next) {
  const start_time = Date.now();
  const id = +ctx.request.params.id;
  try {
    const post = await Post.findByPk(id);
    if (post && post.UserId === ctx.user.id) {
      await next();
    } else if (!post) {
      throw new Error('The post does not exist.');
    } else {
      throw new Error('The user is not authorized.');
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

// authorization check before deleting a like :
async function authorization_like(ctx, next) {
  const start_time = Date.now();
  const id = +ctx.request.params.id;
  try {
    const like = await Like.findByPk(id);
    if (like && like.UserId === ctx.user.id) {
      await next();
    } else if (!like) {
      throw new Error('The like does not exist.');
    } else {
      throw new Error('The user is not authorized.');
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

// authorization check before deleting a comment :
async function authorization_comment(ctx, next) {
  const start_time = Date.now();
  const id = +ctx.request.params.id;
  try {
    const comment = await Comment.findByPk(id);
    if (comment && comment.UserId === ctx.user.id) {
      await next();
    } else if (!comment) {
      throw new Error('The comment does not exist.');
    } else {
      throw new Error('The user is not authorized.');
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

// authorization check before deleting a sub comment :
async function authorization_sub_comment(ctx, next) {
  const start_time = Date.now();
  const id = +ctx.request.params.id;
  try {
    const sub_comment = await SubComment.findByPk(id);
    if (sub_comment && sub_comment.UserId === ctx.user.id) {
      await next();
    } else if (!sub_comment) {
      throw new Error('The sub comment does not exist.');
    } else {
      throw new Error('The user is not authorized.');
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

module.exports = {
  authorization_post,
  authorization_like,
  authorization_comment,
  authorization_sub_comment,
};
