const Group = require('../models/group')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    create : (req, res) => {
        let userid = req._id
        let data = { name, description,picture} = req.body  
        data.peoples = JSON.parse(req.body.peoples)
        data.peoples.push( userid)
        let newGroup = new Group( data )
        newGroup
            .save()
            .then( newGroupCreated => {
                res.status(200).json({ success : true})
            })
            .catch( error => {
                console.log('ini meruapakan error :', error)
                let path = Object.keys( error.errors)
                let message = path.map(p => {
                    return error.errors[p]
                })
                res.status(500).json({ path , message})
            })
    },
    read : (req, res) => {
        let userid = req._id
        console.log( userid)
        Group
            .find({ peoples : userid })
            .populate('peoples', ['name','picture'])
            .populate('todoes')
            .then( groups =>{
                res.status(200).json( groups )
            })
            .catch( error => {
                res.status(500).json({ message : error.message })
            })
    },
    findById : (req, res) => {
        let id = req.params.id
        Group
        .findById(id)
        .populate('peoples', ['name','picture'])
        .populate({
            path : 'todoes',
                populate : {
                    path : 'user'
                }
        })
        .then( group =>{
            res.status(200).json( group )
        })
        .catch( error => {
            res.status(500).json({ message : error.message })
        })
    }
}