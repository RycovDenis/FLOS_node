const Tickets = require('../model/TicketsModel.js');
const Notify = require('./NotyfyController');
exports.create_new_ticket = function(req, res) {
    const new_ticket = new Tickets(req.body);
    if(typeof req !== 'undefined'){
        Tickets.createTicket(req, function(err, tickets) {
            if (err)
                res.send({
                    error: true,
                    message:err
                });
            res.json({
                error: false,
                message: 'Success created new ticket.',
                result: tickets
            });
            // noinspection JSUnresolvedVariable
            Notify.fcm_notify(req.body.email,"Заявка №"+tickets,req.body.TicketDesc+" Дата: "+new Date() + " Телефон: "+req.body.UserPhone);
        });
    }
};

exports.read_a_ticket = function(req, res) {
    if(typeof req !== 'undefined'){
        const uid = req.body.id; // $_POST["id"]
        const status = req.body.status; // $_POST["status"]
        const role = req.body.role; // $_POST["role"]
            if ( typeof status !== 'undefined'&&status!==null&&uid!==null&&role!==null){
                if(role === "1"){
                    Tickets.getTicketByIdAndStatus(req.body, function(err, tickets) {
                        if (err)
                            res.send({error: true,
                                message:err});
                        res.json({
                            error: false,
                            message: 'Tickets get successfull',
                            tickets});
                    });
                }
                else if (role === "5"){
                    Tickets.getTicketByAllID(req.body, function(err, tickets) {
                        if (err)
                            res.send({error: true,
                                message:err});
                        res.json({
                            error: false,
                            message: 'Tickets get successfull',
                             tickets});
                    });
                }
                else{
                    res.json({ error: true,
                        message: 'Wrong user role' });
                }
            }
            else if (typeof status === 'undefined'&&uid!==null&&role!==null){
                if(role === "1"){
                    Tickets.getTicketById(req.body, function(err, tickets) {
                        if (err)
                            res.send({
                                error: true,
                                message:err
                            });
                        res.json({
                            error: false,
                            message: 'Tickets get successfull',
                            tickets
                        });
                    });
                }
                else if (role === "5"){
                    Tickets.getTicketByAll(req.body, function(err, tickets) {
                        if (err)
                            res.send({
                                error: true,
                                message:err
                            });
                        res.json({
                            error: false,
                            message: 'Tickets get successfull',
                            tickets
                        });
                    });
                }
            }

    }else {
        res.json({ error: true,
            message: 'Wrong method request' });
    }

};


exports.update_a_ticket = function(req, res) {
    Tickets.updateById(req.body.ti_id, req.body.status, function(err, ticket) {
        if (err)
            res.send(err);
        res.json(ticket);
    });
};


exports.delete_a_ticket = function(req, res) {
    const tid = req.body.ti_id;
    const role = req.body.role; // $_POST["role"]
       if (tid!==null&&role!==null){
            if(role === "5"){
                Tickets.remove( tid, function(err, tickets) {
                    if (err)
                        res.send({
                            error: true,
                            message:err
                        });
                    res.json({
                        error: false,
                        message: 'Task successfully deleted'
                    });
                });
            }
            else{
                res.json({ error: true,
                    message: 'Wrong user permissions' });
            }
        }


};