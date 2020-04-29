'use strict';
module.exports = function(app) {
    var index = require('../controller/IndexController');

    // todoList Routes
    app.route('/')
        .get(index.render_index_page);
};
module.exports = function(app) {
    var todoList = require('../controller/TasksController');

    // todoList Routes
    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
};
module.exports = function(app) {
    var ticketList = require('../controller/TicketsController');

    // todoList Routes
    app.route('/api/v1/newti')
        .post(ticketList.create_new_ticket);

    app.route('/api/v1/ticket')
        .post(ticketList.read_a_ticket)
        .put(ticketList.update_a_ticket)
        .delete(ticketList.delete_a_ticket);
};