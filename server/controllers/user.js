const User = require('../models/user.js');
const encryptPassword = require('../helpers/encrypt-password.js');
const token = require('../helpers/token.js');

class UserController {

    static read(req, res) {
        User.find({})
            .then(function(dataUser) {
                res.status(200).json(dataUser);
            })
            .catch(function(error) {
                res.status(500).json(error);
            });
    }
    
    static register(req, res) {
        User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: encryptPassword(req.body.password),
        })
            .then(function(dataUser) {
                res.status(201).json(dataUser);
            })
            .catch(function(error) {
                res.status(500).json(error);
            });
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email,
            password: encryptPassword(req.body.password),
        })
            .then(function(dataUser) {
                console.log(dataUser)
                let objUser = {
                    UserId: dataUser._id,
                    fullName: dataUser.fullName,
                    email: dataUser.email,
                };
                let getToken = token.getToken(objUser);
                res.status(200).json({"token": getToken});
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json({"message": "Email or Password maybe wrong"});
            });
    }

    static tokenCheck(req, res) {
        token.verifToken(req.params.token, function(err, decoded) {
            if(err) {
                res.status(500).json({"message": err.message});
            }else{
                res.status(200).json(decoded);
            }
        });
    }

}

module.exports = UserController;