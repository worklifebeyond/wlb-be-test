const { User, Post, Like, Comment, SubComment } = require('../models');
const { compare_bcrypt_password } = require('../helpers/bcrypt');
const { generate_jwt_token, verify_jwt_token } = require('../helpers/jwt');
const errorHandler = require('../helpers/errorHandler');
const sendEmail = require('../helpers/mailgun');
const log = require('../helpers/logger');

class UserController {
  static async read(ctx) {
    const start_time = Date.now();
    try {
      const all_users = await User.findAll({
        include: [{
          model: Post,
          include: [{
            model: Like,
          }, {
            model: Comment,
            include: [SubComment],
          }],
        }],
      });
      ctx.response.status = 200;
      ctx.response.body = all_users;
      log(
        `${ctx.request.host}${ctx.request.url}`,
        null,
        ctx.request.header.access_token,
        start_time,
        ctx.request,
        ctx.response,
      );
    } catch(err) {
      const { status, errors } = errHandler(err);
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

  static async register(ctx) {
    const start_time = Date.now();
    const { username, email, password } = ctx.request.body;
    try {
      const new_user = await User.create({ username, email, password });

      // Generate user verification token :
      const verification_token = generate_jwt_token(new_user);

      // Response :
      ctx.response.status = 201;
      ctx.response.body = {
        message: 'User Registration Success',
        verification_token,
        data: new_user,
      };
      log(
        `${ctx.request.host}${ctx.request.url}`,
        { username, email },
        ctx.request.header.access_token,
        start_time,
        ctx.request,
        ctx.response,
      );

      // Send email with Mailgun API :
      const url = `${process.env.BASE_URL}/users/verify?token=${verification_token}`;
      const email_data = {
        from: `Blog App Team <alf.tirta@gmail.com>`,
        to: `${new_user.email}`,
        subject: `Blog App - User Verification`,
        text: `Please click on this link to verify your account : ${url}`,
      };
      sendEmail(email_data);
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

  static async verify(ctx) {
    const start_time = Date.now();
    const { token } = ctx.request.query;
    try {
      const decoded_user_data = verify_jwt_token(token);
      const user = await User.findOne({
        where: {
          username: decoded_user_data.username,
          email: decoded_user_data.email,
        }
      });

      // Validate the verification token :
      if (!user) {
        throw new Error('The verification link is invalid.');
      } else if (user.status === 'active') {
        throw new Error('The account has already been verified.');
      } else {
        const user_activated = await User.update({ status: 'active' }, {
          where: { id: user.id },
          returning: true,
        });
        ctx.response.status = 200;
        ctx.response.body = {
          message: 'User Verification Success',
          data: user_activated[1][0],
        };
        log(
          `${ctx.request.host}${ctx.request.url}`,
          { username: user.username, email: user.email },
          ctx.request.header.access_token,
          start_time,
          ctx.request,
          ctx.response,
        );
      }
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
      log(
        `${ctx.request.host}${ctx.request.url}`,
        { username: user.username, email: user.email },
        ctx.request.header.access_token,
        start_time,
        ctx.request,
        ctx.response,
      );
    }
  }

  static async login(ctx) {
    const start_time = Date.now();
    const { email, password } = ctx.request.body;
    try {
      const user = await User.findOne({ where: { email }});
      
      // Validate the given email and password :
      if (!user) {
        throw new Error('The email or password is invalid.');
      } else {
        const password_matched = compare_bcrypt_password(password, user.password);
        if (!password_matched) {
          throw new Error('The email or password is invalid.');
        } else if (password_matched && user.status !== 'active') {
          throw new Error('Please verify your account.');
        } else {
          const access_token = generate_jwt_token(user);
          ctx.response.status = 200;
          ctx.response.body = {
            message: 'User Login Success',
            access_token,
            user_id: user.id,
          };
          log(
            `${ctx.request.host}${ctx.request.url}`,
            { username: user.username, email: user.email },
            ctx.request.header.access_token,
            start_time,
            ctx.request,
            ctx.response,
          );
        }
      }
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
      log(
        `${ctx.request.host}${ctx.request.url}`,
        { username: user.username, email: user.email },
        ctx.request.header.access_token,
        start_time,
        ctx.request,
        ctx.response,
      );
    }
  }
}

module.exports = UserController;
