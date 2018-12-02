const Todo = require('../models/todo')
const User = require('../models/user')
const { decodeToken, apiError } = require('../helpers')

let validKeys = {
  todos: Object.keys(Todo.schema.obj),
  users: Object.keys(User.schema.obj)
}

module.exports = {
  filterReqBody(req, res, next) {
    for (let key in req.body) {
      if (!validKeys[req.baseUrl.slice(1)].includes(key)) {
        delete req.body[key]
      }
    }
    next()
  },

  filterReqQuery(req, res, next) {
    for (let key in req.query) {
      if (key === 'id') {
        req.query._id = req.query.id
        delete req.query.id
      }
      else if (key !== '_id' && !validKeys[req.baseUrl.slice(1)].includes(key)) {
        delete req.query[key]
      }
    }
    console.log(req.query)
    next()
  },

  authentication(req, res, next) {
    decodeToken(req.get('Authorization'))
      .then(decoded => {
        return User.findById(decoded.userId).exec()
          .then(user => {
            if (user) {
              req.currentUser = user.toObject()
              req.currentUser.id = user.id
              delete req.currentUser._id
              delete req.currentUser.__v
              delete req.currentUser.password
              next()
            } else {
              throw new apiError(400, "User doesn't exist")
            }
          })
      })
      .catch(err => {
        res.status(err.httpCode || 500).json({ error: err.message })
      })
  }
}