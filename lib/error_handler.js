'use strict';

const logger = require(__dirname + '/logger');

exports.not_found = () => {
    return (req, res, next) => {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    };
};

exports.error = (env) => {
    return (err, req, res, next) => {
        const error = err.message || err.data || err;

        if (!(err instanceof Error)) {
            err = new Error(err);
        }

        logger.error(error);

        if (typeof error === 'object') {
            for (let key in error) {
                if (typeof error[key] !== 'function') {
                    logger.warn(key + ': ' + JSON.stringify(error[key]));
                }
            }
        }

        if (err.stack) {
            logger.error(err.stack);
        }

        if (env === 'development') {
            res.status(err.status || 500);
            res.render('error', {
              message: err.message,
              error: err
            });

            return;
        }


        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });

    };
};
