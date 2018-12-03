const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID


module.exports = {
    generate: (data) => {
        let token = jwt.sign({
            id: data._id,
            email: data.email,
            username: data.username
        }, process.env.secret)
        return token
    }
}