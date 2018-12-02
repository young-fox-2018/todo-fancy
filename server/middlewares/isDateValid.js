const moment = require('moment')

function isDateValid(req, res, next) {
    let due_date = req.body.due_date.replace(/^\s+|\s+$/g,'');
    due_date = moment(due_date).format("MMM D, YYYY")
    if (due_date == 'Invalid date') {
        res.status(400).json({ message: "Invalid due date" })
    } else {
        req.due_date = due_date
        next()
    }
}

module.exports = isDateValid