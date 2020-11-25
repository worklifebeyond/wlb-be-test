const { User } = require('../models');
const { verify_jwt_token } = require('../helpers/jwt');
const errorHandler = require('../helpers/errorHandler');

async function authentication(ctx, next) {
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
    ctx.body = errors;
  }
}

module.exports = authentication;
