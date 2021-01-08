const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(+process.env.SALT);
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password.hash)
}

module.exports = {
    hashPassword,
    comparePassword
}