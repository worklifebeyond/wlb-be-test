const jwt = require('jsonwebtoken')

const signToken = (payload) => {
    const { id, email, password, status } = payload
    // const token = jwt.sign(payload, process.env.SECRET)
    return jwt.sign({id, email, password, status }, process.env.SECRET)
}

const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.SECRET)
    return decoded
}

module.exports = {
    signToken, 
    verifyToken
}