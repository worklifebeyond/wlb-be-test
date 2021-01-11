const { Subcomment, Comment, User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

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
                ctx.response.status = 201
                ctx.response.body = {msg: 'success', data: newSubComment}
            }

        }
    }
}

module.exports = SubcommentController