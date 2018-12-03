const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)


module.exports = {
    hash: (password) => {
        let hash = bcrypt.hashSync(password, salt)
        return hash
    },
    compare: (input, password) => {
        return bcrypt.compareSync(input, password)
    }
}