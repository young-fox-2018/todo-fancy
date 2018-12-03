const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TodoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title must be filled!']
    },
    description: {
        type: String,
        required: [true, 'Todos description must be filled!']
    },
    priority: {
        type: String,
        required: [true, 'Please set your todo priority']
    },
    date: {
        type: Date,
        required: [true, 'Please set your date'],
        default: new Date(),
        validate: {
            validator: function (value) {
                return new Promise((resolve, reject) => {
                    if (value < new Date().getDate()) {
                        reject(`The date is passed...Please input valid date!`)
                    } else {
                        resolve()
                    }
                })


            }
        }
    },
    location: {
        type: String,
        required: [true, 'Choose your location']
    },
    status: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Todo = mongoose.model('Todo', TodoSchema)



module.exports = Todo