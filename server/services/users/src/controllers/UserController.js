class UserController {
  static async register(ctx) {
    // const { username, email, password } = ctx.request.body;
    // try {
    //   const new_user = await User.create({ username, email, password });
    //   return ctx.body = {
    //     id: new_user.id,
    //     email: new_user.email,
    //   };
    // } catch(err) {
    //   console.log(err);
    // }
  }

  static async login(ctx) {}
}

module.exports = UserController;
