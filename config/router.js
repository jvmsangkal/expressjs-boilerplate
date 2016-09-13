'use strict';

const path = require('path');
const importer = require(path.join(__dirname, '..', 'helpers', 'importer'));
const controllers = importer(__dirname, '..', 'controllers');
const routes = importer(__dirname, '..', 'routes');
const router = require('express').Router();

module.exports = () => {
    router.use('/', routes.index(controllers));
    router.use('/api', routes.api(controllers));

    return router;
};
