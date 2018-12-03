const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo_list', { useNewUrlParser: true })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error :'))
db.once('open', function(){
    console.log('database connected!')
})



const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
    .use(express.urlencoded({ extended : false}))
    .use(express.json())


const TodoRoute = require('./routes/route-todo')
const loginRoute = require('./routes/route-login')
const groupRoute = require('./routes/route-group')

app
    .use('/todo', TodoRoute)
    .use('/users', loginRoute)
    .use('/groups', groupRoute)


app.listen(PORT, function(){
    console.log('Listening to port : ', PORT)
})