const { Comment, Post, Like, User } = require('../models')
const { verifyToken } = require('../helpers/jwt')
const mailgunloader = require('mailgun-js')

let mailgun = mailgunloader({
    apiKey: process.env.APIKEY,
    domain: process.env.DOMAIN
})

class LikeController {
    static async add(ctx) {
        const {token} = ctx.request.headers
        const decode = verifyToken(token)

        const loginUser = await User.findOne({
            where: {
                email: decode.email
            }
        })

        // console.log(loginUser, '<<<< ada gak lu?')
        if(!loginUser) {
            ctx.response.status = 400
            ctx.response.body = {msg: 'invalid token'}
        } else {
            const {id} = ctx.request.params
            const getPost = await Post.findOne({
                where: {
                    id
                },
                include: { model:User}
            })
            console.log(getPost.User, '<< ada gak')
            if (!getPost) {
                ctx.response.status = 400
                ctx.response.body = {msg: 'post not found'}
            } else {
                const newLikes = await Like.create({
                    UserId: loginUser.id, PostId: id
                })
                const data = {
                    from: "Delvia's Blog <delviawp@gmail.com>",
                    to: `${getPost.User.email}`,
                    subject: 'You have new notification',
                    text: 'You have got like from ' + loginUser.email 
                }
                // console.log(data, '<<< data')

                mailgun.messages().send(data, (error, body) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(body)
                    }
                })

                ctx.response.status = 200
                ctx.response.body = {msg: 'You liked this post!', data: newLikes}
            }

        }
    }
}

module.exports = LikeController