const User = require('../models/user.js'),
      jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
  static read(req, res){
    User.findById(req.decode.id)
        .then(user => {res.status(200).json(user)})
	.catch(error => {res.status(500).json({"error":error.message})})
  }

  static create(req, res){
    User.findOne({email: req.body.email})
	  .then( user => {
	  if (user){
		//nanti harus dikirim email, diberitahukan bahwa mencoba mendaftar menggunakan email ini
	      res.status(500).json({"error":"Please check your email for next registration process!"})
	  }
	  else {
	  let newUser = new User ({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password 
	      });
	      newUser.save((err, result)=>{
		      if (err) res.status(500).json({error:err.message});
		      else res.status(200).json({result:"Success create new user.."});
	      });
	    };
	  })
	  .catch( error => {
	    console.log(error)
	    res.status(500).json({"error":error.message})
	  });
  }
	
  static login(req, res){
    User.findOne({ $or:[{username:req.body.identity},{email:req.body.identity}]})
      .then(user => {
        user.comparePassword(req.body.password, (err, isMatch)=>{
          if (err) res.status(500).json({error:"email or password didn't match, please try again!"})
          else{
            if (isMatch){
              let data = {
                id: user._id, 
                email: user.email
              }
              jwt.sign(data, process.env.jSecret,(err, token)=>{
                if(err) {
            console.log(err)
            res.status(500).json({error:"Something wrong, please contact developer!"})
          } else {
            res.status(200).json(token)
          }
              });
            } else {
              res.status(500).json({error:"email or password didn't match, please try again!"})
            };
          };
        });
      })
      .catch(error => {
	console.log(error)
        res.status(500).json({error:"Something wrong, please contact developer!"})
      })
  }

  static update(req, res){
    User.findOne({_id:req.decode.id})
        .then(user => {
	  user.comparePassword(req.body.passwordLast,(err, isMatch)=>{
	    if (err){
              console.log(err)
              res.status(500).json({error:"Something wrong, please contact developer!"})
            } else {
	      if (isMatch){
	        user.password = req.body.passwordNew
		      user.save().then( result => {
		              res.status(200).json(result)
		            })
		           .catch( error => {
                    res.status(500).json({error:"Something wrong, please contact developer!"})
                })
                } else {
                  res.status(500).json({error:"email or password didn't match, please try again!"})
                }
            }; 
	  })})
  }

  static delete(req, res){
    User.deleteOne({_id:req.decode.id})
	.then(result => {
	  res.status(200).json(result)
	})
	.catch(error => {
	  res.status(500).json({error:"email or password didn't match, please try again!"})
	})
  }

  static gSignIn ( req, res ) {
     const {OAuth2Client} = require('google-auth-library');
     const client = new OAuth2Client(process.env.gSecret);
     client.verifyIdToken({
        idToken: req.headers.gtoken
     },( err, result ) => {
           if ( err ) {
                res.status(500).json( err )
            } else {
                User.findOne({ email : result.payload['email']})
                .then( user => {
                    if ( user !== null ){
                        let data = { 
                          id : user._id,
                          email: user.email
                        }
                        jwt.sign( data, process.env.jSecret,(err, token)=>{
                          if(err) {
                            console.log(err)
                            res.status(500).json({error:"Something wrong, please contact developer!"})
                          } else {
                            res.status(200).json(token)
                          }
                        })                       
                    } 
                    else {
                        let user = new User ({
                            email: result.payload['email'],
                            password: req.headers.gtoken
                        })
                        user.save( (err, data) => {
                            if (err) {
                                console.log( err )
                                res.status(500).json({ "error found" : err})
                            } if ( data ) {
                                let data = { 
                                  id : user._id,
                                  email: user.email
                                }
                                jwt.sign( data, process.env.jSecret,(err, token)=>{
                                if(err) {
                                  console.log(err)
                                  res.status(500).json({error:"Something wrong, please contact developer!"})
                                } else {
                                  res.status(200).json(token)
                                }
                              })
                            }
                        })
                    }
                })
                .catch( err => {
                    console.log(err)
                    res.status(500).json( {"Upps something wrong.." : err} )
                })
            }
        });
    }

  static fSignIn ( req, res ) {
    var request = require('request');
 
    var options = {
      url: `https://graph.facebook.com/v3.2/me?fields=id,name,email&access_token=${req.headers.ftoken}`,
      headers: {
        'User-Agent': 'request'
      }
    };
 
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
      let data = JSON.parse(body);
      User.findOne({email: data.email})
          .then( user => {
            if (user){
  	       let decodeData = {
             id:user._id,
             email: user.email
            }
               jwt.sign(decodeData, process.env.jSecret,(err, token)=>{
               if(err) {
                  console.log(err)
                  res.status(500).json({error:"Something wrong, please contact develop    er!"})
               } else {
                  res.status(200).json(token)
               }
              })
	    }
            else {
	      let randomPswd = Math.random().toString(36).slice(-8);    
              let newUser = new User ({
                username: data.name,
                email: data.email,
                password: randomPswd
              });
              newUser.save((err, result)=>{
                if (err) res.status(500).json({error:"Something wrong, please co    ntact developer!"});
                else {
		let decodeData = {id:result._id}
                 jwt.sign(decodeData, process.env.jSecret,(err, token)=>{
                 if(err) {
                   console.log(err)
                   res.status(500).json({error:"Something wrong, please contact develop    er!"})
                 } else {
                   res.status(200).json(token)
                 }
		})
              }
	    });
      	  }})
          .catch( error => {
              console.log(error)
              res.status(500).json({"error":"Something wrong, please contact developer!"    })
          });
      } 
    }
   request.get(options, callback);
 }
};

module.exports = UserController;
