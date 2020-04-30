module.exports = function(app) {
    const ticketList = require('../controller/TicketsController');
    const notifyList = require('../controller/NotyfyController');
    const adminList = require('../controller/AdminController');
    const usersList = require('../controller/UsersController');

    app.route('/newti')
        .post(ticketList.create_new_ticket);
    app.route('/ticket')
        .post(ticketList.read_a_ticket)
        .put(ticketList.update_a_ticket)
        .delete(ticketList.delete_a_ticket);

    app.route('/adminifo')
        .post(adminList.read_admin_info)
        .put(adminList.write_admin_info);

    app.route('/signin')
        .post(usersList.signin_user);
    app.route('/signup')
        .post(usersList.signup_user);
    app.route('/cfnewuser')
        .post(usersList.confirm_user);
    app.route('/verifysms')
        .post(usersList.verify_sms);
    app.route('/uinfo')
        .post(usersList.read_user_info)
        .put(usersList.write_user_info);

    app.route('/regdevice')
        .post(notifyList.registerDevice);
    app.route('/sendspm')
        .post(notifyList.sendSinglePush);
};