const User = require('../models/user')

class Controller {
    static viewUsers (req, res) {
        User
            .find()
            .then(users => {
                res.status(200).json({ message: "Data retrieved", data: users })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: "Please see console for detail" })
            })
    }
}

module.exports = Controller