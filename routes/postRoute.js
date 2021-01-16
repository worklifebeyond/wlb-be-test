const PostController = require('../controllers/postController')
const CommentController = require('../controllers/commentController')
const LikeController = require('../controllers/likeController')
const SubcommentController = require('../controllers/subCommentController')



const postRoute = (router) => {
    router.post('/post', PostController.create)
    router.get('/post', PostController.findAll)
    router.put('/post/:id', PostController.edit)
    
    router.delete('/post/:id', PostController.delete)
    router.post('/post/:id/comment', CommentController.create)
    router.post('/post/comment/:id/subcomment', SubcommentController.create)
    router.get('/post/:title&:filter&:sortby', PostController.findPost)
    // router.get('/post/:username&:filter', PostController.findByUsername)
    router.get('/post/comment/:id', CommentController.fetchComment)
    router.post('/post/:id/like', LikeController.add)
    router.get('/post/:title', PostController.findByTitle)
}

module.exports = postRoute