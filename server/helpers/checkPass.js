const bcrypt = require('bcrypt');
const saltRounds = 7;

module.exports={
    checkPass: function(input, pass){
        return bcrypt.compareSync(input, pass)
    }
}