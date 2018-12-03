const Todo = require('../models/todo')
const ObjectId = require('mongoose').Types.ObjectId
const User = require('../models/user')
const Group = require('../models/group')

module.exports = {
    read : (req, res) => {

        let userid = req._id
        User
            .findById( userid )
            .populate('todoes')
            .select(['todoes', '_id','name','email','picture'])
            .exec( function(err , userdata) {
                let user = {
                    todoes : userdata.todoes,
                    _id : userdata._id,
                    name : userdata.name,
                    email : userdata.email,
                    picture : userdata.picture
                }
                
                if( err ) {
                    res.status(500).json( { message: error.message})
                }else {
                    res.status(200).json( user )
                }
            })
    },
    create : (req, res) => {
       var createdNewTodo

        let userid = req._id
        let todo = new Todo({ name : req.body.name, description : req.body.description, due_status : req.body.due_status, user : userid})

        todo
            .save()      
            .then( newtodo => {
                createdNewTodo = newtodo
               return User.findById( userid)
            })
            .then( user => {
                user.todoes.push(todo._id)
                return user.save()
            })
            .then( response_adding_todo_to_user => {
                if( req.body.id_group ){
                    Group.update({ _id : req.body.id_group}, { $push : { todoes : todo._id}})
                        .then( result => {
                            res.status(200).json( createdNewTodo )
                        })
                        .catch( error => {
                            res.status(500).json({path,message})
                        })
                }else{
                    res.status(200).json( { createdNewTodo } )   
                }
                
            })
            .catch( error => {
               let path = Object.keys(error.errors)
               let message = path.map(p=>{
                   return error.errors[p].message
               })
               res.status(500).json({path,message})
            })
    },
    update : (req, res) => {
        let id = ObjectId(req.params.id)
        let data = req.body
       
        Todo
            .findById(id)
            .then( todo => {
                if ( todo ) {
                    todo.set( data )
                    todo
                        .save()
                        .then( respose => {
                            res.status(200).json( respose )
                        })
                        .catch( error => {
                            let path = Object.keys(error.errors)
                            let message = path.map(p=>{
                                return error.errors[p].message
                            })
                            res.status(500).json({path,message})
                        })        
                }else {
                    res.status(500).json({ error : 'Maaf Todo list tidak ditemukan!'})    
                }  
            })
            .catch( error => {
                res.status(500).json({ message : 'error while update todo list', error : error.message}) 
            })
        
    },
    destroy : (req, res) => {
        let id = ObjectId(req.params.id)
        User
                    .findById(req._id)
                    .populate('todoes')
                    .then( user => {
                       let document = user.todoes.find( doc => {
                           return doc.equals(id)
                       })   
                       user.todoes.pull(document._id)
                       return user.save()
                    })
                    .then( response_pull => {
                       return Todo.findByIdAndRemove(id)
                    })
                    .then( response_remove => {
                        res.status(200).json(response_remove)
                    })
                    .catch( error => {
                        res.status(500).json( { message : 'Error while delete todo', error:error.message})                                    
                     })
    }   
}