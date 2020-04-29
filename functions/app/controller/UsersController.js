const Users = require('../model/UserModel.js');

exports.signup_user = function(req, res) {
    const new_user = new Users(req.body);

    //handles null error
    if(!new_user.username || !new_user.password){
        res.status(400).send({
            error:true,
            message: 'Please provide username/password'
        });

    }
    else{
        Users.createNewUser(new_user, function(err, user) {
            if (err)
                res.send({
                    error: true,
                    message:err
                });
            res.json({
                error: false,
                message: 'Success created new user.',
                result: user
            });
        });
    }
};

exports.signin_user =function (req,res) {

};
exports.isUserExisted =function (req,res) {
    Users.isUserExisted(req.body.username,function(err, rezult) {
        if(!rezult){
            console.log("MOJNO");
        }else {
            console.log("NIZZAY");
        }
    });
};
