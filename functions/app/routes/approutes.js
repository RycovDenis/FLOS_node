module.exports = function(app) {
    const ticketList = require('../controller/TicketsController');
    // todoList Routes
    app.route('/newti')
        .post(ticketList.create_new_ticket);

    app.route('/ticket')
        .post(ticketList.read_a_ticket)
        .put(ticketList.update_a_ticket)
        .delete(ticketList.delete_a_ticket);
};
module.exports = function(app) {
    const Users = require('../controller/UsersController');
    // todoList Routes
    app.route('/signin')
        .post(Users.signin_user);

    app.route('/signup')
        .post(Users.signup_user);

    // app.route('/cfnewuser')
    //     .post(Users.confir_user);
    //
    app.route('/verifysms')
        .post(Users.isUserExisted);
    //     .post(Users.verify_sms);
    //
    // app.route('/getuinfo')
    //     .post(Users.read_user_info);
    //
    // app.route('/setuinfo')
    //     .post(Users.write_user_info);
};