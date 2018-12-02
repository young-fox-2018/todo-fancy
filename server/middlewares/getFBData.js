const axios = require('axios')

function getFbData(req, res, next) {
    axios({
        method: "GET",
        url: `https://graph.facebook.com/v3.2/me?fields=id,name,email&access_token=${req.body.fbtoken}`,
    })
    .then(user => {
        req.fbdata = user.data
        next()
    })
    .catch(err => {
        console.log(err)    
        res.status(500).json({message: err.response.data.message, note: "Please see console for details"})
    })
}

module.exports = getFbData