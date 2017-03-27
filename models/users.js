'use strict';

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
            username: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            tableName: 'users'
        }
    );

    return User;
};
