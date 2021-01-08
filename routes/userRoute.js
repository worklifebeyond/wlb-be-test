const UserController = require('../controllers/userController')

const userRoute = (router) => {
    router.post('/register', UserController.register)
    router.get('/register/verify', UserController.verify)
}

module.exports = userRoute