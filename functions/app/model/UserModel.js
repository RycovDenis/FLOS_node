const sql = require('../libs/db.js');
const passHash = require('password_hash');

const User = function (user) {
    this.email = user.username;
    this.username = user.username.substr(0, user.username.indexOf("@"));
    this.salt = passHash().salt();
    this.password = passHash(user.password).hash(this.salt);
    this.status = "1";
    this.role = "1";
    // this.ti_date = new Date();

};

User.createNewUser = function (newUser, result) {
    sql.query("INSERT INTO users set ?", newUser, function (err, res) {
        let hash = newUser.password;
       console.log(passHash("v0Vqla20").verify(hash));
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{

            result(null, res.insertId);
        }
    });
};
User.isUserExisted = function (username,result){
    // sql.query( "SELECT count(*) as total FROM users WHERE email = '"+username+"'",function (err, res){
    sql.query( "SELECT count(*) as total FROM users WHERE email = '"+username+"'",function (err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
      if(res[0].total > 0){
          return  true;
      }else {
          return false;
      }
    });

}


module.exports= User;