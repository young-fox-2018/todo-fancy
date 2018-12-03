const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(13)

class bcryptHelper{
    static encode(password){
        console.log(password)
        return bcrypt.hashSync(password, salt)
    }

    static match(password, hash){
        return bcrypt.compareSync(password, hash)
    }
}

module.exports = bcryptHelper