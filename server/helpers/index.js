const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class apiError extends Error {
  constructor(httpCode, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, apiError);
    }
    this.httpCode = httpCode;
  }
}


module.exports = {
  apiError,

  hash(str) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(str, 8, (err, hash) => {
        if (err) reject(err)
        else resolve(hash)
      })
    })
  },

  hashSync(str) {
    return bcrypt.hashSync(str, 8)
  },

  compareHash(str, hash) {
    return bcrypt.compare(str, hash)
  },

  getToken(data) {
    return new Promise((resolve, reject) => {
      jwt.sign(data, process.env.JWT_SECRET, (err, token) => {
        if (err) reject(err)
        else resolve(token)
      })
    })
  },

  decodeToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) reject(new apiError(401, err.message))
        else resolve(decoded)
      })
    })
  }
}