const { Post, User, Like, Comment, sequelize } = require('../models')
const { verifyToken } = require('../helpers/jwt')


class PostController {
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
            const { title, description } = ctx.request.body
            const newPost = await Post.create({
                title, description, UserId: loginUser.id
            })

            if (!newPost) {
                ctx.response.status = 400
                ctx.response.body = {msg: 'please input the title and description'}
            } else {
                ctx.response.status = 201
                ctx.response.body = {msg: 'success', data: newPost}
            }
        }
    }

    static async findAll(ctx) {
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
            
            const newPost = await Post.findAll({
                include: [Like, Comment]
            })
            ctx.response.status = 201
            ctx.response.body = {msg: 'success', data: newPost}
        }
    }

    static async edit(ctx) {
        const {token} = ctx.request.headers
        const decode = verifyToken(token)

        const loginUser = await User.findOne({
            where: {
                email: decode.email
            }
        })

        if(!loginUser) {
            ctx.response.status = 400
            ctx.response.body = {msg: 'please login first'}
        } else {
            const { title, description } = ctx.request.body
            const { id } = ctx.request.params
            // console.log(id, '<< null gak')
            const newPost = await Post.findByPk(id)
            // console.log(newPost, '<<< ada gak')
            if (!newPost) {
                ctx.response.status = 404
                ctx.response.body = {msg: 'post not found'}
            } else {
                const updatePost = await Post.update({title, description}, 
                    {
                        where: {
                            id
                        }
                    })
                    ctx.response.status = 200
                    ctx.response.body = {msg: 'updated success', updatePost}
            }
        }
    }

    static async delete(ctx) {
        const {token} = ctx.request.headers
        const decode = verifyToken(token)

        const loginUser = await User.findOne({
            where: {
                email: decode.email
            }
        })

        if(!loginUser) {
            ctx.response.status = 400
            ctx.response.body = {msg: 'please login first'}
        } else {
            const { id } = ctx.request.params

            const newPost = await Post.findByPk(id)

            if(!newPost) {
                ctx.response.status = 404
                ctx.response.body = {msg: 'post not found'}
            } else {
                const deletePost = await Post.destroy({
                    where: { id }
                })
                ctx.response.status = 200
                ctx.response.body = {msg: 'post deleted'}
            }
        }
    }

    static async findPost(ctx) {
        const { token } = ctx.request.headers
        const decode = verifyToken(token)

        const loginUser = await User.findOne({
            where: {
                email: decode.email
            }
        })

        // console.log(loginUser, '<< loginuser')

        if(!loginUser) {
            ctx.response.status = 400
            ctx.response.body = {msg: 'invalid token'}
        } else {
            const { title, filter, sortby } = ctx.request.params
            const newPost = await Post.findAll({
                where: {title},
                // attributes: { include: [[sequelize.fn('COUNT', sequelize.col('Likes.id')), 'LikesCount']] },
                include: [Like, Comment],
                order: [[filter, sortby]],
                // group: ['Post.id']
            })

            console.log(newPost, '<< ada kan')

            if(!newPost) {
                ctx.response.status = 400
                ctx.response.body = {msg: 'post not found'}
            } else {
                ctx.response.status = 200
                ctx.response.body = {msg: 'success', data: newPost}
            }
        }
    }

    static async findByTitle(ctx) {
        const { token } = ctx.request.headers
        const decode = verifyToken(token)

        const loginUser = await User.findOne({
            where: {
                email: decode.email
            }
        })

        if(!loginUser) {
            ctx.response.status = 400
            ctx.response.body = {msg: 'invalid token'}
        } else {
            const { title } = ctx.request.params
            const newPost = await Post.findAll({
                where: {title},
                include: [Like, Comment]
            })

            if(!newPost) {
                ctx.response.status = 400
                ctx.response.body = {msg: 'post not found'}
            } else {
                ctx.response.status = 200
                ctx.response.body = {msg: 'success', data: newPost}
            }
        }
    }
    
}

module.exports = PostController