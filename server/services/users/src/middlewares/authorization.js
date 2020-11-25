const { User, Post, Like } = require('../models');
const { verify_jwt_token } = require('../helpers/jwt');
const errorHandler = require('../helpers/errorHandler');

// authorization check before updating or deletinga post :
async function authorization_post(ctx, next) {
  const id = ctx.request.params.id;
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
    ctx.body = errors;
  }
}

// authorization check before deleting a like :
async function authorization_like(ctx, next) {
  const id = ctx.request.params.id;
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
    ctx.body = errors;
  }
}

module.exports = {
  authorization_post,
  authorization_like,
};
