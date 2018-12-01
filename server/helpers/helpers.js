const User = require('../models/user.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Invitation = require('../models/invitation')
const Group = require('../models/group')

class Helpers {
  static checkPassword(password, DBPassword) {
    return bcryptjs.compareSync(password, DBPassword)
  }
  static generateToken(email) {
    return jwt.sign(email, process.env.JWT_SECRET)
  }
}

module.exports = Helpers
