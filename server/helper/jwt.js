const jwt = require('jsonwebtoken');
require("dotenv").config()

function token(data) {
    return token = jwt.sign({ data }, process.env.jwtTokens);
}

module.exports = token