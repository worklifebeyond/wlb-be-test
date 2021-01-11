const { Subcomment, Comment, User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

const mailgunloader = require('mailgun-js')

let mailgun = mailgunloader({
    apiKey: process.env.APIKEY,
    domain: process.env.DOMAIN
})

class SubcommentController {
    static async create (ctx) {
        const { token } = ctx.request.headers
        const decode = verifyToken(token)

        const loginUser = await User.findOne({
            where: {
                email: decode.email
            }
        })

        if (!loginUser) {
            ctx.response.status = 400
            ctx.response.body = {msg: 'please login first'}
        } else {
            const { content } = ctx.request.body
            const { id } = ctx.request.params

            const isSubComment = await Comment.findByPk(id)

            // console.log(isSubComment, '<<< ada comment gak')
            
            if (!isSubComment) {
                ctx.response.status = 404
                ctx.response.body = {msg: 'not found'}
            } else {
                const newSubComment = await Subcomment.create({
                    content, UserId: loginUser.id, CommentId: id
                })

                const data = {
                    from: "Delvia's Blog <delviawp@gmail.com>",
                    to: `${loginUser.email}`,
                    subject: 'You have a new notification',
                    text: "Someone has replied your comment " + loginUser.email
                }

                mailgun.messages().send(data, (error, body) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(body)
                    }
                })

                ctx.response.status = 201
                ctx.response.body = {msg: 'success', data: newSubComment}
            }

        }
    }
}

module.exports = SubcommentController