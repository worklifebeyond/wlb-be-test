const { User } = require('../models')
const mailgunloader = require('mailgun-js')
const { verifyToken, signToken } = require('../helpers/jwt')

let mailgun = mailgunloader({
    apiKey: process.env.APIKEY,
    domain: process.env.DOMAIN
})


class UserController {
    static async register(ctx) {
        const { email, password } = ctx.request.body;
        try {
            const newUser = await User.create({
                email, password
            })

            const token = signToken({email: newUser.email})
            // console.log(newUser, '<<< ini user')
            const link = `http://localhost:3000/register/verify?token=${token}`
            
            const data = {
                from: 'Excited User <delviawp@gmail.com>',
                to: `${newUser.email}`,
                subject: 'verify account',
                text: 'Link verification: ' + link 
            }

            mailgun.messages().send(data, (error, body) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(body)
                }
            })

            ctx.response.status = 201
            ctx.response.body = { msg: 'Success'}
            console.log('sukses')
            
        } catch (error) {
            console.log(error, '<<< ini error')
        }
    }

    static async verify(ctx) {
        const { token } = ctx.request.query;
        const decode = verifyToken(token)
        // console.log(decode)

        const loginUser = await User.findOne({
            where: {
                email: decode.email
            }
        })
        // console.log(loginUser, '<<<< login user')
        if (!loginUser.status) {
            User.update({
                status: true
            }, {
                where: {
                    email: decode.email
                }
            })
            ctx.response.status = 200
            ctx.response.body = {msg: 'verification success'}
        } else {
            ctx.response.status = 400
            ctx.response.body = {msg: 'link invalid'}
        }
    }
}

module.exports = UserController;