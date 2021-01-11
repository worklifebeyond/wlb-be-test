const { Comment, Post, User } = require('../models')
const { verifyToken } = require('../helpers/jwt')
const mailgunloader = require('mailgun-js')

let mailgun = mailgunloader({
    apiKey: process.env.APIKEY,
    domain: process.env.DOMAIN
})

class CommentController {
    static async create(ctx) {
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
            ctx.response.body = {msg: 'please login first'}
        } else {
            const { content } = ctx.request.body
            const { id } = ctx.request.params
            const getPost = await Post.findOne({
                where: {
                    id
                }, 
                include: {model: User}
            })
            if (!getPost) {
                ctx.response.status = 404
                ctx.response.body = {msg: 'post not found'}
            } else {
                const newComment = await Comment.create({
                content, UserId: loginUser.id, PostId: id })

                const data = {
                    from: "Delvia's Blog <delviawp@gmail.com>",
                    to: `${getPost.User.email}`,
                    subject: 'You have new notification',
                    text: 'You have a new comment ' + loginUser.email 
                }
                // console.log(data, '<<< data')

                mailgun.messages().send(data, (error, body) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(body)
                    }
                })
                ctx.response.status = 201
                ctx.response.body = {msg: 'Comment Posted', data: newComment}
            }  
        }
    }
}

module.exports = CommentController