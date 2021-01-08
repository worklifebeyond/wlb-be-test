const PostController = require('../controllers/postController')

const postRoute = (router) => {
    router.post('/post', PostController.create)
    router.put('/post/:id', PostController.edit)
    router.delete('/post/:id', PostController.delete)
    
}

module.exports = postRoute