const sql = require('../libs/db.js');
const passHash = require('password_hash');
/**
 *
 * @param user
 * @constructor
 */
const User = function (user) {
    this.email = user.username;
    this.username = user.username.substr(0, user.username.indexOf("@"));
    this.salt = passHash().salt();
    this.password = passHash(user.password).hash(this.salt);
    this.status = "1";
    this.role = "1";
    // this.ti_date = new Date();
};
/**
 *
 * @param newUser
 * @param result
 */
User.createNewUser = function (newUser, result) {
    sql.query("INSERT INTO users set ?", newUser, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};
/**
 *
 * @param username
 * @param result
 */
User.isUserExisted = function (username,result){
    // sql.query( "SELECT count(*) as total FROM users WHERE email = '"+username+"'",function (err, res){
    sql.query( "SELECT count(*) as total FROM users WHERE email = '"+username+"'",function (err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }else{
            result(null, res[0].total);
        }

      // return res[0].total;
    });

};
/**
 *
 * @param req
 * @param result
 */
User.checkData = function (req,result){
    const username = req.body.username;
    const password = req.body.password;
    sql.query("SELECT password FROM users WHERE email='"+username+"'",function (err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }else{
            const hash = res[0].password;
            // if (!$hash or !password_verify($password, $hash))
            if(passHash(password).verify(hash)){
                result(null, true);
            }
            result(null, false);
        }

    });
};
/**
 *
 * @param req
 * @param result
 */
User.getUserData = function (req,result){
    const username = req.body.username;
    sql.query("SELECT u.id, u.email,u.role, u.status, pi.user_id, f_name, l_name, m_name, inn, mobile_phone, INET_NTOA(ip), tab_num, company_post, region, date_password, r.role_name FROM personal_info pi, users u, roles r WHERE pi.user_id = u.id and r.id = u.role and u.email = '"+username+"';" ,function (err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }else{
            result(null, res);
        }
    });
};
/**
 *
 * @param req
 * @param sms_key
 * @param cost
 * @param balance
 * @param result
 */
User.putVerCode=function(req,sms_key,cost,balance,result){
    const getIP = require('ipware')().get_ip;
    const email = req.body.email;
    const uphone = req.body.uphone;
    const ipInfo = getIP(req);

    console.log(ipInfo);
    const strtotime = require('locutus/php/datetime/strtotime');

    const key_time = strtotime(new Date());
    sql.query("INSERT INTO checked_sms(email,uphone, sms_key, key_time, cost, balance) VALUES('"+email+"','"+uphone+"', '"+sms_key+"', '"+key_time+"', '"+cost+"','"+balance+"')",function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};
/**
 *
 * @param req
 * @param result
 */
User.checkVerCode = function(req,result){
    const email = req.body.email;
    const vcode = req.body.vcode;
    sql.query( "SELECT sms_key FROM checked_sms where email = '"+email+"'and sms_key ='"+vcode+"';",function (err, res){
        const v_key = res[0].sms_key.toString();
        if(err) {
            console.log("error: ", err);
            result(err, null);

        }else if (v_key === vcode){
            result(null, true);
        }else{
            result(null, false);
        }
    });

};

User.readUserInfo = function(req,result){
    const uid = req.body.uid;
    sql.query( "SELECT u.email,u.username, pi.user_id, f_name, l_name, m_name, inn, mobile_phone, INET_NTOA(ip), tab_num, company_post, region, date_password FROM personal_info pi, users u WHERE pi.user_id = u.id and u.id = '"+uid+"';",function (err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);

        }else{
            console.log("error: ", res);
            result(null, res);
        }
    });

};

User.createUserInfo =function(req,result){
    const uid = req.body.uid,
        fname = req.body.fname,
        lname = req.body.lname,
        mname = req.body.mname,
        uinn = req.body.uinn,
        ucp = req.body.ucp,
        uregion = req.body.uregion,
        utabnum = req.body.utabnum,
        uphone = req.body.uphone,
        date_p = new Date();
    // 'ip'=>get_ip(),
//     INET_ATON(:ip)
    sql.query( `insert into personal_info(user_id, f_name, l_name, m_name, inn, mobile_phone, tab_num, company_post, region, date_password)  values ('${uid}','${fname}','${lname}','${mname}','${uinn}','${uphone}','${utabnum}','${ucp}','${uregion}','${date_p}');`,function(err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("error: ", err);

            result(null, res.insertId);
        }
    });
};
module.exports= User;