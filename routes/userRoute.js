const UserController = require('../controllers/userController')

const userRoute = (router) => {
    router.post('/register', UserController.register)
}

module.exports = userRoute