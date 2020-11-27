const { User } = require('../models');
const { compare_bcrypt_password } = require('../helpers/bcrypt');
const { generate_jwt_token, verify_jwt_token } = require('../helpers/jwt');
const errorHandler = require('../helpers/errorHandler');
const sendEmail = require('../helpers/mailgun');

class UserController {
  static async register(ctx) {
    const { username, email, password } = ctx.request.body;
    try {
      const new_user = await User.create({ username, email, password });
      ctx.response.status = 201;
      ctx.response.body = new_user;

      // Generate user verification token :
      const verification_token = generate_jwt_token(new_user);

      // Send email with Mailgun API :
      const url = `http://localhost:3001/users/verify?token=${verification_token}`;
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
    }
  }

  static async verify(ctx) {
    const { token } = ctx.request.query;
    try {
      const decoded_user_data = verify_jwt_token(token);
      const user = await User.findOne({
        where: {
          username: decoded_user_data.username,
          email: decoded_user_data.email,
        }
      });

      // Validate the token :
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
        ctx.response.body = { message: 'User Verification Success' };
      }
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }

  static async login(ctx) {
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
          ctx.response.body = { access_token, user_id: user.id };
        }
      }
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.response.body = errors;
    }
  }
}

module.exports = UserController;
