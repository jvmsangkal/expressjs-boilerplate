'use strict';

const router = require('express').Router();


module.exports = (__) => {

    router.get('/users', __.user.get_users);

    return router;
};
