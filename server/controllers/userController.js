const userModel   = require('../models/user')
const jwt         = require('jsonwebtoken')
const bcrypt      = require('bcryptjs');
const salt        = bcrypt.genSaltSync(10)

module.exports= {
    register:function(req,res){
        let loginUser = {
            name      : req.body.name,
            email     : req.body.email,
            password  : req.body.password,
            apilogin  : false
        }
        userModel.create(
            loginUser
        )
        .then(data=>{
            res.status(200).json({
                message:'Successfully added',
                data : data
            })
        })
        .catch(err=>{
            res.status(400).json({
                message: err.message
            })
        })
    },
    login:function(req,res){
        let userLogin = {
            email: req.body.email
        }
        userModel.findOne({
            email:userLogin.email
        })
        .then(function(logging){
          if(logging===null||logging===undefined){
            res.status(400).json({
                msg:"maaf anda belom terdaftar silahkan daftar dulu"
            })
          }else{
            let hasil = bcrypt.compareSync(req.body.password, logging.password)
            if(hasil === true){
              let decoded={
                name : logging.name,
                email: logging.email
              }
              let data = jwt.sign(decoded, process.env.secret_jwt)
              res.status(200).json({
                token:data
              })
            }else{
              res.status(400).json({
                  msg:"maaf password anda salah"
              })
            }
          }
        })
        .catch(function(err){
            console.log(err)
        })
    }
}
