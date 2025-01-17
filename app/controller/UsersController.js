const Users = require('../model/UserModel.js');
const key = "144541354333adswcxs2axas24xcas1x456as47d532c4w";
const jsonwt = require('jsonwebtoken');
const strtotime = require('locutus/php/datetime/strtotime');

exports.signin_user =function (req,res) {
    if(typeof req !== 'undefined'){
        Users.isUserExisted(req.body.username,function(err, rezult) {
            if (err){
                console.log(err);
            }
            if(rezult===1){
                Users.checkData(req,function(err, rezult) {
                    if (err){
                        console.log(err);
                    }
                    if(rezult) {

                        Users.getUserData(req,function(err, rezult) {
                            if (err){
                                console.log(err);
                            }
                            const url = require('url');
                            const adr = req.protocol + '://' + req.get('host');
                            const q = url.parse(adr, true);
                            const jwt = jsonwt.sign({
                                iss: q.host,
                                aud: q.host,
                                iat: strtotime(new Date()),
                                uid: rezult[0].user_id,
                                firstname: rezult[0].f_name,
                                lastname: rezult[0].l_name,
                                email: rezult[0].email,
                                mphone: rezult[0].mobile_phone,
                                role_id: rezult[0].role,
                                role_name: rezult[0].role_name
                            }, key);
                            res.json({
                                error: false,
                                message: 'Success created new user.',
                                jwt: jwt
                            });
                        });
                    }
                });
            }
        });
    }else {
        res.send({
            error: true,
            message: 'Wrong method request'
        });
    }

};

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
        Users.isUserExisted(req.body.username,function(err, rezult) {
            if (err){
                console.log(err);
            }
            if(rezult<=0){
                Users.createNewUser(new_user, function(err, user) {
                    if (err){
                        res.send({
                            error: true,
                            message:err
                        });
                    }else{
                        res.json({
                            error: false,
                            message: 'Success created new user.',
                            uid: user
                        });
                    }
                });
            }else {
                res.send({
                    error: true,
                    message: 'This email existed'
                });
            }
        });
    }
};

exports.confirm_user =function (req,res) {
    function randomSMSKey(skmlenght) {
        const charset = "0123456789";
        let retVal = "";
        let i = 0;
        const n = charset.length;
        for (; i < skmlenght; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    if(typeof req !== 'undefined'){
        const email = req.body.email; // $_POST["status"]
        const uphone = req.body.uphone; // $_POST["status"]
        if(email!==null&&uphone!==null){
            const ver_code = randomSMSKey(6);
            const ver_url = "https://smsc.kz/sys/send.php?login=vargar929&psw=v0Vqla20&phones=+" + uphone + "&mes=Код верификации:" + ver_code + "!&translit=1";
            const msg_pre = "Ваш код потверждения:";
            const msg_post = ". Наберите его в поле ввода.";
            const http = require('http');
            http.get(`http://smsc.kz/sys/send.php?login=vargar929&psw=v0Vqla20&phones=+${encodeURIComponent(uphone)}
            &mes=${encodeURIComponent(msg_pre)}${encodeURIComponent(ver_code)}${encodeURIComponent(msg_post)}&translit=1&cost=3&fmt=3`, function(resp){
                let body = '';
                resp.on('data', function(data){
                    body += data;
                });

                resp.on('end', function(){
                    const cost = JSON.parse(body).cost;
                    const balance = JSON.parse(body).balance;
                    Users.putVerCode(req,ver_code,cost,balance,function(err, k_sms) {
                        if (err){
                            res.send({
                                error: true,
                                message:err
                            });
                        }else{
                            res.json({
                                error: false,
                                message: 'Success created new user.',
                                uid: k_sms
                            });
                        }
                    });
                });
            });
        }
    }else{
        res.send({
            error: true,
            message: 'Not Released'
        });
    }

};

exports.verify_sms =function (req,res) {
    if(typeof req !== 'undefined'){
        // noinspection JSUnresolvedVariable
        if(req.body.email!==null&&req.body.vcode!==null){
            Users.checkVerCode(req,function(err, result){

               if(result){
                   if (err){
                       res.send({
                           error: false,
                           message:err,
                           status: false
                       });
                   }else{
                       res.json({
                           error: false,
                           message: 'Success created new user.',
                           status: true
                       });
                   }
               }

            });
        }
    }else{
        res.send({
            error: true,
            message: 'Not Released'
        });
    }

};

exports.read_user_info =function (req,res) {
    if(typeof req !== 'undefined') {
        if(req.body.uid!==null){
            Users.readUserInfo(req,function (err,result) {
                if (err){
                    console.log(err);
                }
                const jwt = jsonwt.sign({
                    email: result[0].email,
                    username: result[0].username,
                    user_id: result[0].user_id,
                    f_name: result[0].f_name,
                    l_name: result[0].l_name,
                    m_name: result[0].m_name,
                    inn: result[0].inn,
                    mobile_phone: result[0].mobile_phone,
                    tab_num: result[0].tab_num,
                    company_post: result[0].company_post,
                    region: result[0].region,
                    date_password: result[0].date_password
                }, key);
                res.json({
                    error: false,
                    message: 'Success geted user info.',
                    jwt: jwt
                });
            });
        }else{
            res.send({
                error: true,
                message: 'Not Released'
            });
        }

    }else{
        res.send({
            error: true,
            message: 'Not Released'
        });
    }

};

exports.write_user_info =function (req,res) {
    if(typeof req !== 'undefined') {
        Users.createUserInfo(req,function (err,result) {
            if (err){
                res.send({
                    error: true,
                    message:err
                });
            }else{
                res.json({
                    error: false,
                    message: 'Success created new user info.',
                });
            }
        });
    }else {
        res.send({
            error: true,
            message: 'Not Released'
        });
    }
};
