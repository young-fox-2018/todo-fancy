const Helpers = require('../helper/index')

class Middleware {
    static checkUser(req, res, next) {
        if (req.headers.token == undefined) {
            res.status(401).json({
                msg: 'unauthorize user'
            })
        } else {
            next()
        }
    }
    static checkLogin(req, res, next) {
        Helpers.getUserDataServer(req.headers.token)
            .then(data => {
                if (data.email === undefined) {
                    res.status(401).send('error')
                } else {
                    next()
                }
            })
            .catch(err => {
                res.status(401).send('error')
            })
    }
}

module.exports = Middleware