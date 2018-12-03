const User = require('../models/user')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.googleClientId)

module.exports = {
    authorization: function(req, res, next) {
        Promise.all([User.findOne({email: req.body.email}), User.findOne({username: req.body.email})])
            .then(user => {
                if (user[0] || user[1]) {
                    console.log('masuk error disini')
                    if (user[0]) {
                        req.signin = user[0]
                        next()
                    }
                    else if (user[1]){
                        req.signin = user[1]
                        next()
                    }
                }
                else if (!user[0] && !req.headers.googletoken) {
                    res.status(400).json({msg: 'incorrect email or username'})
                    console.log('masuk google sini')
                }
                else {
                    async function verify() {
                        const ticket = await client.verifyIdToken({
                            idToken: req.headers.googletoken,
                            audience: process.env.googleClientId,  // Specify the CLIENT_ID of the app that accesses the backend
                            // Or, if multiple clients access the backend:
                            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
                        });
                        const payload = ticket.getPayload();
                        const userid = payload['sub'];
                        req.googleSignin = payload
                        // console.log(payload)
                        next()
                        // If request specified a G Suite domain:
                        //const domain = payload['hd'];
                      }
                      verify().catch(console.error);
                }
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }, 
}