const Todo = require('../models/todo')

module.exports = {
  create(req, res) {
    // req.body is already filtered by express middleware
    Todo.create(Object.assign(req.body, { user: req.currentUser.id }))
      .then(todo => {
        res.status(201).json({ error: null, response: todo })
      })
      .catch(err => {
        res.status(500).json({ error: err.message })
      })
  },

  read(req, res) {
    // req.query is already filtered by express middleware
    Todo.find(Object.assign(req.query, { user: req.currentUser.id }))
      .populate('user').exec()
      .then(todos => {
        res.status(200).json({ error: null, response: todos })
      })
      .catch(err => {
        res.status(500).json({ error: err.message })
      })
  },

  update(req, res) {
    // req.body and req.query are already filtered by express middleware
    delete req.body.user // user can not change ownership of task
    Todo.findOneAndUpdate(Object.assign(req.query, { user: req.currentUser.id }), req.body).exec()
      .then(todo => {
        res.status(204).json({ error: null })
      })
      .catch(err => {
        res.status(500).json({ error: err.message })
      })
  },

  delete(req, res) {
    Todo.findOneAndDelete(Object.assign(req.query, { user: req.currentUser.id })).exec()
      .then((todo) => {
        res.status(204).json({ error: null })
      })
      .catch(err => {
        res.status(500).json({ error: err.message })
      })
  }
}