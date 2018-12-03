const jwt = require('jsonwebtoken')

function authorization(req,res,next){
  try{
    let token = req.headers.authorization
    // console.log("====",token)
    let decoded = jwt.verify(token,process.env.SECRET)
    req.userData = decoded
    // console.log("+++",decoded)
    next()
  } 
  catch(error){
    res.status(400).json({
      msg: "Auth failed"
    })
  }
}

module.exports = authorization