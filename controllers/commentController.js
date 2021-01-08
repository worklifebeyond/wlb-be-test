const { Comment, Post, User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

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
            ctx.response.body = {msg: 'invalid token'}
        } else {
            const { content } = ctx.request.body
            const { id } = ctx.request.params
            const getPost = Post.findByPk(id)
            if (!getPost) {
                ctx.response.status = 400
                ctx.response.body = {msg: 'post not found'}
            } else {
                const newComment = await Comment.create({
                content, UserId: loginUser.id, PostId: id })
                ctx.response.status = 201
                ctx.response.body = {msg: 'Comment Posted', data: newComment}
            }  
        }
    }
}

module.exports = CommentController