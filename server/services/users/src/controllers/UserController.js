const { User } = require('../models');
const { compare_bcrypt_password } = require('../helpers/bcrypt');
const { generate_jwt_token } = require('../helpers/jwt');
const errorHandler = require('../helpers/errorHandler');

// Mailgun API :
const api_key = `${process.env.MAILGUN_API_KEY}`;
const domain = `${process.env.MAILGUN_DOMAIN}`;
const mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain,
});

class UserController {
  static async register(ctx) {
    const { username, email, password } = ctx.request.body;
    try {
      const new_user = await User.create({ username, email, password });

      // Send email with Mailgun API
      const data = {
        from: `Blog App <alf.tirta@gmail.com>`,
        to: `${new_user.email}`,
        subject: `Blog App - User Verification`,
        text: `
Here is the link to verify your account :
(user verification link)`,
      };
      mailgun.messages().send(data, (error, body) => {
        if (error) {
          console.log(error);
        } else {
          console.log(body);
        }
      });

      ctx.response.status = 201;
      ctx.body = new_user;
    } catch(err) {
      const { status, errors } = errorHandler(err);
      ctx.response.status = status;
      ctx.body = errors;
    }
  }

  static async verify(ctx) {
    const { username, email, password } = ctx.request.query;
    try {
      const user = await User.findOne({ where: { username, email }});
      if (!user) {
        ctx.throw('The user verification link is invalid.');
      } else {
        const password_matched = compare_bcrypt_password(password, user.password);
        if (!password_matched) {
          ctx.throw('The user verification link is invalid.');
        } else {
          const user_activated = await User.update({
            status: 'active',
          }, {
            where: {
              username,
              email,
              password: user.password,
            },
            returning: true,
          });
          ctx.response.status = 200;
          ctx.body = user_activated[1][0];
        }
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
