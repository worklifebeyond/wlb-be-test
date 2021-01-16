const logHelper = require('../helpers/log')


const log = async (ctx, next) => {
    const start = Date.now()
    await next()
    const accessTime = Date.now() - start
    const path = ctx.request.url
    const reqObject = ctx.request
    const resObject = ctx.response
    const detailUser = {
        username: "Delvia",
        email: "delviawp@gmail.com"
    }
    logHelper({
        accessTime, path, reqObject, resObject, detailUser
    })
}



module.exports = log