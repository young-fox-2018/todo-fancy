const request = require('request');
const User = require('../models/Users.js')
const jwt = require('jsonwebtoken');
const {encrypt,checkPassword} = require('../helpers/helper.js')
 
class userController{

    static signup(req,res){
        let {name,email,password} = req.body
        User.findOne({email: email},function(err,user){
            if(err){
                console.log(err)
                res.status(400).json({err})
            } else {
                if(user){
                    // alert(`anda sudah pernah login melalui ${user.loginBy}`)
                    res.status(400).json({msg:`anda sudah pernah login melalui ${user.loginBy}`})
                } else {
                    let newData = {name,password,email,loginBy:"email"}
                    // console.log(newData)
                    User.create(newData, function(err,user){
                        if(err) res.status(400).json({err})
                        else res.status(200).json({user})
                    })
                }
            }
        })
    }

    static signinEmail(req,res){
        let {email,password} = req.body
        User.findOne({email},function(err,user){
            if(err){
                res.status(400).json({err})
            } else {
                if(user){
                    console.log("user ada")
                    if(checkPassword(password,user.password)){
                        //success login
                        let token = jwt.sign({ email }, process.env.SECRET);
                        res.status(200).json({user,token})
                    } else {
                        console.log("password salah")
                        res.status(400).json({err: "wrong password"})
                    }
                } else {
                    // user not found
                    res.status(400).json({err: "user not found"})
                }
            }

        })
    }

    static signinFacebook(req,res){
        console.log(req.body.token)
        const options = {
            url: 'https://graph.facebook.com/v3.2/me',
            method: 'post',
            json: true,
            qs:{
                fields: "name,email",
                access_token: `${req.body.token}`
            }
          };
             
        request(options, function(error, response, body) {
            // if(error) res.status(400).json({error})
            // else res.status(response.statusCode).json({body})
            
            if (!error) {
              User.findOne({email: body.email},function(err,result_user){
                  if(err){
                      res.status(400).json({err})
                  } else {
                      let {name, email} = body
                      let newData = {name, email, password:null, loginBy:"facebook"}
                      if(!result_user){
                          User.create(newData, function(err,datauser){
                              console.log("masuk create")
                              let token = jwt.sign({ email: datauser.email }, process.env.SECRET);
                              if(err) res.status(400).json({err})
                              else res.status(200).json({datauser,token})
                          })
                      } else {
                          let token = jwt.sign({ email }, process.env.SECRET);
                          res.status(200).json({result_user,token})
                      }
                  }
              })
            } else {
                res.status(response.statusCode).json({error})
            }
        });
    }

    static signout(){
        var options = {
            url: 'https://localhost:3000/logout',
            headers: {
              'User-Agent': 'request'
            }
          };

        request(options, function(error,response,body){
            if(error) res.status(response.statusCode).json({error})
            else res.status(response.statusCode).json({body})
        });
    }
}

module.exports = userController