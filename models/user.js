const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
    resetToken: {
        type: DataTypes.STRING
    },
    resetTokenExpiration: {
        type: DataTypes.STRING
    },
    avatarUrl: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    dateOfBirth: {
        type: DataTypes.BIGINT,
        defaultValue: 631231200000
    }
}, {
    freezeTableName: true,
    tableName: "users",
    hooks: {
        afterCreate: (record) => {
            delete record.dataValues.password;
            delete record.dataValues.resetToken;
            delete record.dataValues.resetTokenExpiration;
        }
    }
});

module.exports = User;