const token = require('../helpers/token.js');
const User = require('../models/user.js');

module.exports = {
    isAuth(req, res, next) {
        if(req.headers.token) {
            try{
                token.verifToken(req.headers.token, function(err, decoded) {
                    if(err) {
                        res.status(401).json({"message": "No Autority"});
                    }else{
                        User.findOne({
                            email: decoded.email,
                        })
                            .then(function(resolve) {
                                req.user = decoded;
                                next();
                            })
                            .catch(function(reject) {
                                res.status(401).json({"message": "No Autority"});
                            });
                    }
                });
            }catch(err){
                res.status(401).json({"message": "No Autority"});
            }
        }else{
            res.status(401).json({"message": "No Autority"});
        }
    }
}