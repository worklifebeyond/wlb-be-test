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
      ctx.body = new_user;

      // Generate user verification token :
      const verification_token = generate_jwt_token(new_user);

      // Send email with Mailgun API :
      const url = `http://localhost:3000/users/verify?token=${verification_token}`;
      const email_data = {
        from: `Blog App <alf.tirta@gmail.com>`,
        to: `${new_user.email}`,
        subject: `Blog App - User Verification`,
        text: `Please click on this link to verify your account : ${url}`,
      };
      sendEmail(email_data);
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.body = errors;
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
      if (!user) {
        ctx.body = 'The verification link is broken.';
      } else if (user.status === 'active') {
        ctx.body = 'The user has already been verified.';
      } else {
        const user_activated = await User.update({
          status: 'active',
        }, {
          where: {
            id: user.id,
          },
          returning: true,
        });
        ctx.response.status = 200;
        ctx.body = 'User Verification Success';
      }
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.body = errors;
    }
  }

  static async login(ctx) {
    const { email, password } = ctx.request.body;
    try {
      const user = await User.findOne({ where: { email }});
      //
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = UserController;
