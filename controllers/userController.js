const { User } = require('../models')

class UserController {
    static async register(ctx) {
        const { email, password } = ctx.request.body;
        try {
            const newUser = await User.create({
                email, password
            })
            if ( newUser ) {
                ctx.response.status = 201
                ctx.response.body = { message: 'Success'}
                console.log('sukses')
            }
        } catch (error) {
            console.log(error, '<<< ini error')
        }
    }
}

module.exports = UserController;