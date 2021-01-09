const PostController = require('../controllers/postController')
const CommentController = require('../controllers/commentController')
const LikeController = require('../controllers/likeController')


const postRoute = (router) => {
    router.post('/post', PostController.create)
    router.put('/post/:id', PostController.edit)
    router.delete('/post/:id', PostController.delete)
    router.post('/post/:id/comment', CommentController.create)
    router.post('/post/:id/like', LikeController.add)
    router.get('/post/:title', PostController.findPost)
}

module.exports = postRoute