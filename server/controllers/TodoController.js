const Todos = require('../models/Todos');
const ObjectID = require('mongodb').ObjectID;
const User = require('../models/User');
const verifyToken = require('../helpers/verifyToken');

module.exports = {
    createTodo: function(req, res, next) {
        const {title, description, due_date, user} = req.body;

        const newTodo = { title, description, due_date, user: ObjectID(user) };
        Todos.create(newTodo, function(err, todo) {
            if(!err) {
                res.status(200).json({
                    message: `Success create new todo`,
                    todo
                });
            } else {
                res.status(500).json({
                    message: `Error create new todo`,
                    error: err.message
                });
            }
        });
    },
    getAllTodos: function(req, res, next) {
        Todos.find({}, function(err, todos) {
            if(!err) {
                res.status(200).json({
                    message: `All todos found`,
                    todos
                });
            } else {
                res.status(500).json({
                    messag: `Error getting all todos`,
                    error: err.message
                });
            }
        })
    },
    updateTodo: function(req, res, next) {
        const {idTodo} = req.params;
        const {title, description, due_date, status, token} = req.body;
        
        const {id} = verifyToken(token);        
        User.findById(id, function(err, user) {
            if(!err) {
                if(user) {                    
                    const updated = {title, description, due_date, status, user};
                    for(let key in updated) {
                        if(updated[key] === undefined) delete updated[key];
                    }
            
                    Todos.findByIdAndUpdate(idTodo, updated, function(err, todo) {
                        if(!err) {
                            res.status(200).json({
                                message: `Success update todo`
                            });
                        } else {
                            res.status(500).json({
                                message: `Error update todo`,
                                error: err.message
                            });
                        }
                    });
                } else {
                    res.status(400).json({
                        message: `User not found`
                    });
                }
            } else {
                res.status(500).json({
                    message: `Error finding user`,
                    error: err.message
                });
            }
        });

    },
    deleteTodo: function(req, res, next) {
        const {idTodo} = req.params;        
        
        Todos.findOneAndDelete({_id: idTodo}, function(err, todo) {            
            if(!err) {
                if(todo) {                    
                    res.status(200).json({
                        message: `Success delete todo`
                    });
                } else {
                    res.status(400).json({
                        message: `No todo with that id`
                    });
                }
            } else {
                res.status(500).json({
                    message: `Error delete todo`,
                    error: err.message
                });
            }
        });
    }
}