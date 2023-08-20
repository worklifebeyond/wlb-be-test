const { User } = require('../models');
const { verify_jwt_token } = require('../helpers/jwt');
const errorHandler = require('../helpers/errorHandler');
const log = require('../helpers/logger');

async function authentication(ctx, next) {
  const start_time = Date.now();
  const { access_token } = ctx.request.header;
  try {
    const decoded_user_data = verify_jwt_token(access_token);
    const { id, username, email, status } = decoded_user_data;
    const user = await User.findOne({
      where: { id, username, email, status },
    });
    if (!user) {
      throw new Error('The user is not authenticated.');
    }
    ctx.user = user;
    await next();
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

module.exports = authentication;
