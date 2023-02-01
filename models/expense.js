const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Expense = sequelize.define('expense', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'TL'
    },
    date: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'expense'
    }
}, {
    freezeTableName: true,
    tableName: "expenses"
});

module.exports = Expense;