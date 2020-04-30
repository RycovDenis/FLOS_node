const sql = require('../libs/db.js');

const Notify = function (notyfy) {
    this.uid = notyfy.uid;
    this.email = notyfy.email;
    this.token = notyfy.token;
    // this.ti_date = new Date();
};

Notify.registerDevice = function (newDevice, result) {
    // sql.query("INSERT INTO users set ?", newUser, function (err, res) {
    sql.query("INSERT INTO devices set ? ", newDevice, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    });
};

Notify.isEmailexist = function (req, result) {
    // sql.query("INSERT INTO users set ?", newUser, function (err, res) {
    sql.query("SELECT id FROM devices WHERE email = ?", req.body.email, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res.length);
        }
    });
}
Notify.getTokenByEmail = function (req, result) {
    // sql.query("INSERT INTO users set ?", newUser, function (err, res) {
    sql.query("SELECT token FROM devices WHERE email = ?", req.body.email, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

// static function getTokenByEmail($email){
//     $sql = "SELECT token FROM devices WHERE email = :email";
//     $P_result = DB::run($sql,['email'=>$email]);
//     $result = $P_result->fetch(PDO::FETCH_ASSOC);
//     return array($result['token']);
// }

Notify.getAllTokens = function(result){
    sql.query("SELECT token FROM devices", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });

}

module.exports= Notify;