'use strict';

const router = require('express').Router();


module.exports = (__) => {
    router.get('/', function(req, res) {
        res.render('index', {title: 'Express'});
    });

    return router;
};
