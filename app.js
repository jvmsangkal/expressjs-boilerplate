'use strict';
// note on readme: use strongloop, install redis, and mysql

const path = require('path');
const express = require('express');
const body_parser = require('body-parser');
const session = require('express-session');
const RedisStore  = require('connect-redis')(session);
const config = require(path.join(__dirname, 'config', 'config'));
const router = require(path.join(__dirname, 'config', 'router'));
const logger = require(path.join(__dirname, 'lib', 'logger'));
const error_handler = require(path.join(__dirname, 'lib', 'error_handler'));
const database = require(path.join(__dirname, 'database'));

let app;
let handler;

function start () {
    if (handler) {
        handler.close();
    }

    app = express();

    app.set('env', config.ENV);

    database.set_logger_function(logger.info)
        .add('app_db', config.DB, path.join(__dirname, 'models'))
        .syncAll();

    logger.log('info', 'Starting', config.APP_NAME, 'on', config.ENV, 'environment');

    app.use(require('morgan')('combined', {stream: logger.stream}));
    app.use(require('helmet')());
    app.use(require('method-override')());
    app.use(require('compression')());
    app.use(require('cors')(config.CORS));
    app.use(require('cookie-parser')());
    app.use(body_parser.urlencoded({extended: false}));
    app.use(body_parser.json());

    app.use(require('express-session')({
        store: new RedisStore(config.REDIS),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: true}
    }));

    app.use(express.static(path.join(__dirname, 'public')));
    app.set('view engine', 'jade');

    app.use(router());
    app.use(error_handler.not_found());
    app.use(error_handler.error(config.ENV));

    return app.listen(3000, () => {
        logger.info('Server listening on port', config.PORT);
    });
}

handler = start();

module.exports = {
    app,
    handler,
    start
};
