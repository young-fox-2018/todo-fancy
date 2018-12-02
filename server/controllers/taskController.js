const model   = require('../models/task')


module.exports={
    create:function(req,res){
      console.log('masuk sinii')
      let task={
        name:req.body.taskname,
        description:req.body.taskdesc,
        completed:false,
        due_date:req.body.duedate,
        UserId:req.body.UserId
      }
      model.create(task)
               .then(data=>{
                    res.status(200).json({
                        message:'Successfully added',
                        data : data
                    })
               })
               .catch(err=>{
                    res.status(400).json({
                        message: err.message
                    })
               })
    },
    update:{

    },
    findall:function(req,res){
      model.find({},function(err,docs){
        if(err) console.log(err)
        else{
          res.status(200).json(docs)
        }
      })
    },
    findone:{

    },

    delete:{

    }

}
