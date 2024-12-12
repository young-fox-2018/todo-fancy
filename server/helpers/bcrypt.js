const Bcrypt = require("bcryptjs")

module.exports ={
    hashPassword : function (input){
        return Bcrypt.hashSync(input)
    },

    checkPassword: function (input, hashPassword){
        return Bcrypt.compareSync(input, hashPassword)
    }
}