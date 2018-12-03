const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const mongodbUri = 'mongodb://@ds125198.mlab.com:25198/todofancy'
const cors = require('cors')
//routes
const toDoRoute = require('./routes/todo')
const registerationRoute = require('./routes/registeration')
const projectRoute = require('./routes/project')
const userRoute = require('./routes/user')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//connect mongoose
mongoose.connect(mongodbUri,
  {
    useNewUrlParser: true,
    auth: {
      user: process.env.mlab_user,
      password: process.env.mlab_password
    }
  });const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(('You are Mongected'));
});

//path
app.use('/todo', toDoRoute)
app.use('/registeration', registerationRoute)
app.use('/project', projectRoute)
app.use('/user', userRoute)

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})


