//google 
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

//json web token
const { encoded, decoded } = require('../helpers/jasonWebToken')

//model
const User = require('../models/user')
const axios = require('axios')

//bcryptjs
const { comparePassword } = require('../helpers/brcyrpt')

module.exports = {
    read: (req, res) => {
        let key = req.query.name
        User
            .find({ name : new RegExp(key, 'i')}).select(['todoes','_id','email','picture','name'])
            .then( users => {
                res.status(200).json( users )
            }) 
            .catch( error => {
                res.status(500).json( error )
            })
    },
    gSignIn : (req, res) => {
        // let gtoken = req.body.gtoken
       
        // client.verifyIdToken({
        //     idToken : gtoken,
        //     audience : process.env.CLIENT_ID
        // }, (error, data) => {
        //     if (error) {
        //         res.status(500).json({message : 'Error while auntentice google sign in', error: error.message})
        //     }else {
        //         let email = data.payload.email
        //         let name = data.payload.given_name
        //         let password= data.payload.given_name

        //         User
        //             .findOne( { email })
        //             .then( user => {
        //                 if ( user ) {
        //                     let _id = user._id
        //                     let jtoken = encoded({ email, name, _id})  
        //                     res.status(200).json( jtoken )
        //                 }else {
        //                     let user = new User({ name, email, password })
        //                     user
        //                         .save()
        //                         .then( user => {
        //                             let _id = user._id
        //                             let jtoken = encoded({ email, name,_id })
        //                             res.status(200).json( jtoken )
        //                         })
        //                         .catch( error => {
        //                             res.status(500).json({ message : 'Error create user in database', error: error.message})   
        //                         })
        //                 }
        //             })
        //             .catch( error => {
        //                 res.status(500).json({ message : 'Error check user in database', error: error.message})   
        //             })
        //     }
        // })

    },
    facebook : (req, res) => {
        let access_token = req.body.access_token
        axios({
            method : 'GET',
            url : `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${access_token}`
        })
        .then( ({ data }) => {
            let data_user = {
                name : data.name,
                email : data.email,
                picture : data.picture.data.url,
                provider: 'facebook'
            }
           
           let newUser = new User( data_user )
            User
                .findOne({ email : data_user.email})
                .then( user => {
                    if( user ){
                        console.log('user sudah ada !')
                        let token = encoded({ _id : user._id, email: user.email})
                        res.status(200).json({ token, user_id : user._id})
                    }else{
                        return newUser.save()
                    }
                })
                .then( newUser => {
                    let token = encoded({ _id : newUser._id, email: newUser.email})
                    res.status(200).json({ token, user_id : newUser._id})
                })
                .catch( error => {
                    res.status(500).json({ message : error.message})
                })
        })
        .catch( error => {
            console.log( error)
            res.status(500).json({ message : error.message})
        })
    },
    register : (req,res) =>{
        // console.log( 'body :', req.body.name)
        // console.log( req.file )
        let data = {name, email, password} = req.body
        let newUser = new User( data )

        newUser
            .save()
            .then( response => {
                res.status(200).json({ succes : true})
            })
            .catch( error =>{
                let path = Object.keys(error.errors)
                let message = path.map(p => {
                    return error.errors[p].message
                })
                res.status(500).json({ path, message})
            })
    },
    login : (req, res) =>{
        let email = req.body.email
        let password = req.body.password
        console.log('email :', email)
        console.log('password', password)
        User
            .findOne({ email })
            .then( user =>{
                if( user ){
                    let validPassword = comparePassword(password, user.password)
                    console.log( 'val' , validPassword)
                    if( validPassword ){
                        let token = encoded({ _id : user._id, email: user.email})
                        res.status(200).json({ token, user_id : user._id})
                    }else{
                        res.status(400).json({ path : 'password', message:'Password salah'})
                    }
                }else{
                    res.status(400).json({ path : 'email', message:'Email not registered'})
                }
            })
    }
}