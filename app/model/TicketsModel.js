var sql = require('../libs/db.js');

//Task object constructor
var Tickets = function(tickets){
    this.ti_email = tickets.email;
    this.ti_phone = tickets.UserPhone;
    this.title = tickets.ticketTitle;
    this.priority = tickets.ticketPriority;
    this.text = tickets.TicketDesc;
    this.user_id = tickets.UserID;
    // this.owner_id = tickets.owner_id;
    this.status = tickets.status;
    this.ti_date = new Date();

};
Tickets.createTicket = function (newTicket, result) {
    sql.query("INSERT INTO tickets set ?", newTicket, function (err, res) {
    // sql.query("INSERT INTO tickets set ?", newTicket, function (err, res) {

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