const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res){
    //Sign Up
    models.User.findOne({where:{emailAddress:req.body.emailAddress}}).then(result => {
        if(result){
            res.status(409).json({
                message: "Email Address already exists",
        });
        }
        else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        name: req.body.name,
                        surname: req.body.surname,
                        gender: req.body.gender,
                        idNumber: req.body.idNumber,
                        cellNumber: req.body.cellNumber,
                        emailAddress: req.body.emailAddress,
                        password: hash
                    }
                
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: "User created successfully",
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Oops! Something went wrong!",
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Oops! Something went wrong!",
        });
    });
}

function signIn(req, res){
    models.User.findOne({where:{emailAddress:req.body.emailAddress}}).then(user => {
        if(user === null){
            res.status(401).json({
                message: "Invalid credentials!",
            });
        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        emailAddress: user.emailAddress,
                        userId: user.id,
                        name: user.name
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: "Authentication successful!",
                            id: user.id,
                            token: token,
                            name: user.name
                    });
                });
            }else{
                res.status(401).json({
                    message: "Invalid credentials!",
                });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Oops! Something went wrong!",
        });
    });
}

//Get User Details
function getUserDetails(req, res){
    const id = req.params.id;
    
    models.User.findByPk(id).then(result => {
        if(result){
            res.status(200).json({
                data: result
            }); 
        }else{
            res.status(404).json({
                message: "User not found",
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Oops! Something went wrong!",
        })
    })
}

//Get all Users
function getAllUsers(req, res){
    models.Users.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Oops! Something went wrong!",
        });
    });
}

//Update User Details
function updateUserDetails(req, res) {
    const id = req.params.id;
    const updatedUser = {
        cellNumber: req.body.cellNumber,
        emailAddress: req.body.emailAddress,
    }

    models.User.update(updatedUser, {where: {id:id}}).then(result => {
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    }).catch(error => {
        res.status(500).json({
            message: "Oops! Something went wrong!",
            error: error
        });
    });
}

//Delete User
function deleteUser(req, res) {
    const id = req.params.id;

    models.User.destroy({where:{id:id}}).then(result => {
        res.status(200).json({
            message: "User deleted successfully"
        });
    }).catch(error => {
        res.status(500).json({
            message: "Oops! Something went wrong!",
            error: error
        });
    });
}


module.exports = {
    signUp : signUp,
    signIn : signIn,
    getUserDetails :  getUserDetails,
    getAllUsers : getAllUsers,
    updateUserDetails : updateUserDetails,
    deleteUser : deleteUser
}