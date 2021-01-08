const CommentController = require('../controllers/commentController')

const commentRoute = (router) => {
    router.post('/post/:id/comment', CommentController.create)
}

module.exports = commentRoute