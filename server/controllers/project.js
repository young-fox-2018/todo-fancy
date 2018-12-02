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
            .populate('tasks')
            .where('member').in([req.user.UserId])
            .then(function(projects) {
                res.status(200).json(projects);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json({"message": "Error in Server"});
            });
    }

    static addMember(req, res) {
        Project.findOneAndUpdate(
            {
                _id: req.body.ProjectId,
            },
            {
                $push: {member: req.body.UserId},
            },
            {
                new: true,
            }
        )
            .populate('member', ['email'])
            .then(function(project) {
                res.status(200).json(project);
            })
            .catch(function(error) {
                console.log(error);
                res.status(500).json({"message": "Error in Server"});
            });
    }

    static getTaskProject(req, res) {
        Project.findOne({
            _id: req.params.ProjectId,
        })
            .populate('tasks')
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