const Project = require('../models/project.js');

class ProjectController {

    static create(req, res) {
        Project.create({
            name: req.body.name,
        })
            .then(function(newProject) {
                Project.findByIdAndUpdate(
                    {
                        _id: newProject._id,
                    },
                    {
                        $push: {
                            member: req.user.UserId
                        }
                    }
                )
                    .then(function(project) {
                        console.log(project)
                        res.status(200).json(project);
                    })
                    .catch(function(error) {
                        console.log(error);
                        res.status(500).json({"message": "Error in Server"});
                    });
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json({"message": "Error in Server"});
            });
    }

    static read(req, res) {
        Project.find({})
            .populate('member', ['fullName', 'email'])
            .where('member').in([req.user.UserId])
            .then(function(projects) {
                res.status(200).json(projects);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json({"message": "Error in Server"});
            });
    }
    
}

module.exports = ProjectController;