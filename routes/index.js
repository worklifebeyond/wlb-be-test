const userRoute = require('./userRoute')
const postRoute = require('./postRoute')
const commentRoute = require('./commentRoute')

const routing = (router) => {
    userRoute(router)
    postRoute(router)
    commentRoute(router)
}

module.exports = routing