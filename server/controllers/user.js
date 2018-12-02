const User = require('../models/user')
const { apiError, hashSync, getToken, decodeToken } = require('../helpers')

module.exports = {
  signUp(req, res) {
    // req.body is already filtered by express middleware
    User.create(req.body)
      .then(user => {
        res.status(201).json({ error: null, response: user })
      })
      .catch(err => {
        res.status(500).json({ error: err.message })
      })
  },

  signIn(req, res) {
    User.findOne({ $or: [{ username: req.body.identity }, { email: req.body.identity }] })
      .then(user => {
        if (user) {
          return user.isPasswordMatch(req.body.password)
            .then(isMatch => {
              if (!isMatch) throw new apiError(401, "Password doesn't match")
              return getToken({ userId: user.id })
            })
        } else {
          throw new apiError(400, "User doesn't exist")
        }
      })
      .then(token => {
        res.status(200).json({ error: null, response: token })
      })
      .catch(err => {
        res.status(err.httpCode || 500).json({ error: err.message })
      })
  },

  read(req, res) {
    res.status(200).json({ error: null, response: req.currentUser })
  },

  update(req, res) {
    // req.body is already filtered by express middleware
    // hashing password here because pre update hook doesn't work, any suggestion?
    if (req.body.password) req.body.password = hashSync(req.body.password)
    User.findByIdAndUpdate(req.currentUser.id, req.body).exec()
      .then(user => {
        res.status(204).json({ error: null, user })
      })
      .catch(err => {
        res.status(err.httpCode || 500).json({ error: err.message })
      })
  },

  delete(req, res) {
    User.findByIdAndDelete(req.currentUser._id).exec()
      .then(todo => {
        res.status(204).json({ error: null })
      })
      .catch(err => {
        res.status(err.httpCode || 500).json({ error: err.message })
      })
  }
}