const logModel = require('../model/log')

const createLog = async (logs) => {
    const log = await new logModel(logs).save()
}

module.exports = createLog