const Notify = require('../model/NotifyModel.js');
// const Users = require('../model/UserModel.js');

exports.registerDevice = function(req, res) {
    if (typeof req !== 'undefined') {
        if (req.body.uid !== null && req.body.email !== null && req.body.token !== null) {
            const new_device = new Notify(req.body);
            Notify.isEmailexist(req,function (err, result) {
                if (err){
                    console.log(err);
                }
                if (result === 0) {
                    Notify.registerDevice(new_device,function (err, rezult) {
                        if (err){
                            res.send({
                                error: true,
                                message:'Device not registered'
                            });
                        }else if (rezult > 0) {
                            res.send({
                                error: false,
                                message:'Device registered successfully'
                            });
                        }
                    });
                }else{
                    res.send({
                        error: true,
                        message:'Device already registered'
                    });
                }
                });
            }
        }else{
        res.send({
            error: true,
            message:'Wrong Method'
        });
    }
    };

exports.fcm_notify = function (email,title,body,image=null){
    const FCM = require('fcm-node')
    const serverKey = 'AAAAqvENC3M:APA91bHhBEQBRtxJgqQXdvFaxfB_LjHOSQiUkQI9HnHFF2f463q' +
        'Kf_mlZ_Ec88Z5RWEUJ0Joy3SKxxvxkO5f9R33vs_DTzSmLm9PzerDTB1u4D31cim_8to_FaYltZHuZke2nqoVeW6C'; //put the generated private key path here
    const fcm = new FCM(serverKey)
    Notify.getTokenByEmail(email,function (err,result) {
        if(err){
            console.log(err);
        }else{
            const dev_token = result[0].token;
            if(image!==null){
                const message = {
                    to: dev_token,
                    notification: {
                        title: title,
                        body: body,
                        image: image
                    }
                }
                fcm.send(message, function(err, response){
                    if (err) {
                        console.log("Something has gone wrong!")
                    } else {
                        console.log("Successfully sent with response: ", response)
                    }
                })
            }else{

                const message = {
                    to: dev_token,
                    notification: {
                        title: title,
                        body: body,
                        image: null
                    }
                }
                fcm.send(message, function(err, response){
                    if (err) {
                        console.log("Something has gone wrong!")
                    } else {
                        console.log("Successfully sent with response: ", response)
                    }
                })
            }

        }
    })
}

exports.sendSinglePush = function(req, res) {
    if(typeof req !== 'undefined'){
        if(typeof req.body.title !== 'undefined'&&typeof req.body.body !== 'undefined') {
            if(typeof req.body.image!=='undefined'){
                fcm_notify(req.body.email, req.body.title, req.body.body, req.body.image);
            }else {
                fcm_notify(req.body.email, req.body.title, req.body.body);
            }
        }else{
            res.send({
                error: true,
                message:'Parameters missing'
            });
        }
    }else {
        res.send({
            error: true,
            message: 'Invalid request'
        });
    }
};