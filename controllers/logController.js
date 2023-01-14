const Log = require('../model/log')

class LogController {
    static async create(ctx, next, params) {
        console.log(params)

    }
}

module.exports = LogController