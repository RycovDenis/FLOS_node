const sql = require('../libs/db.js');

//Task object constructor
const Tickets = function (tickets) {
    this.ti_email = tickets.email;
    this.ti_phone = tickets.UserPhone;
    this.title = tickets.ticketTitle;
    this.priority = tickets.ticketPriority;
    this.text = tickets.TicketDesc;
    this.user_id = tickets.UserID;
    // this.owner_id = tickets.owner_id;
    // this.status = tickets.status;
    this.ti_date = new Date();

};
Tickets.createTicket = function (req, result) {
    const email = req.body.email,
        uphone = req.body.UserPhone,
        title = req.body.ticketTitle,
        text = req.body.TicketDesc,
        uid = req.body.UserID,
        priority = req.body.ticketPriority,
        date_p = new Date().toISOString().split('T')[0];
    sql.query( "insert into tickets(title, text, user_id, priority, ti_date, ti_email, ti_phone)  values ('"+title+"','"+text+"','"+uid+"','"+priority+"','"+date_p+"','"+email+"','"+uphone+"');",function(err, res){
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
};
Tickets.getTicketByIdAndStatus = function (req, result) {
    sql.query("Select * from tickets where user_id ='"+ req.id+"' and status = '"+req.status+"'", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
Tickets.getTicketByAllID = function (req, result) {
    sql.query("Select * from tickets where status = '"+req.status+"'", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
Tickets.getTicketById = function (req, result) {
    sql.query("Select * from tickets where user_id ='"+ req.id+"'", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Tickets.getTicketAll = function (req, result) {
    sql.query("Select * from tickets", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
Tickets.updateById = function(ti_id, status, result){
    sql.query("UPDATE tickets SET status = ? WHERE ti_id = ?", [status, ti_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
Tickets.remove = function(ti_id, result){
    sql.query("DELETE FROM tickets WHERE ti_id = ?", [ti_id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log("Deleted: ", res);
            result(null, res);
        }
    });
};

module.exports= Tickets;