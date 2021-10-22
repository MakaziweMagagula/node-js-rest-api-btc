const models = require('../models');
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: 'f9147c69',
    apiSecret: 'aiEfNb1gaROjgr9H',
  });
  const from = 'Vonage APIs';

//Add Dependents
function addDependents(req, res){
    const  dependent = {
        name: req.body.name,
        surname: req.body.surname,
        cellNumber: req.body.cellNumber,
        userId: req.userData.userId
    }
    const name = req.userData.name;
    const to = '27729818469';

    models.Dependent.create(dependent).then(result => {
        res.status(201).json({
        message: "Dependent added successfully",
        dependent: result,
        
        });
        const num  = req.body.cellNumber
        const text = "Hello "+ req.body.name+ " ," + name + " has added you to their network.";
        nexmo.message.sendSms(from,to,text);
        
    }).catch(error => {
        res.status(500).json({
        message: "Something went wrong",
        error: error
        });
    });
}

//Update Dependents details
function updateDependents(req, res){
    const id = req.params.id;
    const updatedDependent = {
        name: req.body.name,
        surname: req.body.surname,
        cellNumber: req.body.cellNumber,
    }

    models.Dependent.update(updatedDependent, {where: {id:id}}).then(result => {
        res.status(200).json({
            message: "Dependents details updated successfully",
            data: updatedUser
        });
    }).catch(error => {
        res.status(500).json({
            message: "Oops! Something went wrong!",
            error: error
        });
    });
}

//Delete Dependents
function deleteDependents(req, res){
    const id = req.params.id;

    models.Dependent.destroy({where:{id:id}}).then(result => {
        res.status(200).json({
            message: "Dependent deleted successfully"
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//Show Dependents
function showDependents(req, res){
    //const id = req.params.id;
    const userId = req.userData.userId;

    models.Dependent.findAll({where:{userId: userId}}).then(result => {
        if(result){
            res.status(200).json({
                data : result
            });
        }else{
            res.status(404).json({
                message: "Dependents not found",
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Oops! Something went wrong!",
        })
    })
}

module.exports = {
    addDependents : addDependents,
    updateDependents : updateDependents,
    deleteDependents : deleteDependents,
    showDependents : showDependents
}