'use strict';

const path = require('path');
const db = require(path.join(__dirname, '..', 'database'));

exports.get_users = (req, res, next) => {
    function start () {
        db.use('app_db')
            .User
            .findAll()
            .then(send_response, next);
    }

    function send_response (users) {
        res.send(users);
    }

    start();
};
