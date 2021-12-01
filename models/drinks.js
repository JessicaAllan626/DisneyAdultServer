const { DataTypes } = require('sequelize');
const db = require('../db');

    const Drinks = db.define('drinks', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alcohol: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    module.exports = Drinks;