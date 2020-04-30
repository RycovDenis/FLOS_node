const Tickets = require('../model/TicketsModel.js');

exports.create_new_ticket = function(req, res) {
    const new_ticket = new Tickets(req.body);

    //handles null error
    if(!new_ticket.ti_email || !new_ticket.user_id){
        res.status(400).send({
            error:true,
            message: 'Please provide ticket/status'
        });

    }
    else{
        Tickets.createTicket(new_ticket, function(err, tickets) {
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
        });
    }
};

exports.read_a_ticket = function(req, res) {
    if(typeof req !== 'undefined'){
        var uid = req.body.id; // $_POST["id"]
        var status = req.body.status; // $_POST["status"]
        var role = req.body.role; // $_POST["role"]
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
        var tid =req.body.ti_id;
        var role = req.body.role; // $_POST["role"]
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