const mongoose = require('mongoose')
const { genSalt, hashingPassword } = require('../helpers/brcyrpt')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name :{
        type :  String,
        required : [true, 'Sorry, name must be filled!']
    },
    email : {
        type : String,
        required : [true, 'Sorry, email must be filled!'],
        // validate : {
        //     validator : function(v){
        //         return new Promise( function(resolve, reject){
        //             User
        //                 .findOne({ email : v}, function(error, user){
        //                     if (error ) throw error
        //                     if ( user ){
        //                         console.log( this )
        //                         resolve(false, 'Email already exist!')
        //                     }else{
        //                         console.log('tidak ada user')
        //                         resolve(true)
        //                     }
        //                 })
        //         })     
        //     }
        // }
    },
    password : {
        type : String
    },
    picture : {
        type : String
    },
    todoes : [{ type : Schema.Types.ObjectId, ref : 'Todo'}]
})
userSchema.pre('validate', function(next){
    if( this.provider === 'facebook' ){
        this.password = null
    }
    next()
})

userSchema.pre('save', function ( next ) {
    if ( this.password ){      
        this.password = hashingPassword(this.password, genSalt())
    }
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User