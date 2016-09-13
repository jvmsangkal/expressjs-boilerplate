'use strict';

const Sequelize = require('sequelize');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');


class DB {

    constructor () {
        this.databases = {};
    }

    set_logger_function (logger_func) {
        this.logging = logger_func;

        return this;
    }

    add (key, config, models_dir) {
        let db = {};
        let connection = new Sequelize(
            config.database,
            config.username,
            config.password,
            _({logging: this.logging}).assign(config.options).value()
        );

        if (models_dir) {
            fs.readdirSync(models_dir)
                .forEach(file => {
                    let model = connection.import(path.join(models_dir, file));

                    db[model.name] = model;
                });

            Object.keys(db).forEach(modelName => {
                if (db[modelName].associate) {
                    db[modelName].associate(db);
                }
            });
        }

        db.sequelize = connection;

        this.databases[key] = db;

        return this;
    }

    use (key) {
        return this.databases[key];
    }

    sync (key, options) {
        this.databases[key].Sequelize.sync(options);

        return this;
    }

    syncAll (options) {
        Object.keys(this.databases).forEach(db => {
            this.databases[db].sequelize.sync(options);
        });

        return this;
    }
}

module.exports = new DB();
