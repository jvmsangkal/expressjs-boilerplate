'use strict';

const path = require('path');
const _ = require('lodash');

let env = process.env.NODE_ENV;

const config = {
    APP_NAME: 'Node Boilerplate',

    PORT: 3000,

    CORS:  {
        allowedHeaders: ['Access-Token', 'X-Requested-With', 'Content-Type', 'Accept'],
        origin: '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    },

    UPLOADS_DIR: path.join(__dirname,'..', 'uploads'),
    LOGS_DIR: path.join('/var/log/node'),

    DB: {
        database: 'app_db',
        username: 'root',
        password: '',
        options: {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    },

    REDIS: {
        host: '127.0.0.1',
        port: 6379,
        socket: null
    }
};

if (!env) {
    env = 'development';
}


module.exports = _.assign(config, require(__dirname + '/env/' + env));
