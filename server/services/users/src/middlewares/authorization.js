const { User, Post } = require('../models');
const { verify_jwt_token } = require('../helpers/jwt');
const errorHandler = require('../helpers/errorHandler');

async function authorization(ctx, next) {
  const id = ctx.request.params.id;
  try {
    const post = await Post.findByPk(id);
    if (post && post.UserId === ctx.user.id) {
      await next();
    } else {
      throw new Error('The user is not authorized.');
    }
  } catch(err) {
    const { status, errors } = errorHandler(err);
    ctx.response.status = status;
    ctx.body = errors;
  }
}

module.exports = authorization;
