const { DataTypes } = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
    review: {
        type: DataTypes.STRING,
        allowNull: false
    },
    drinksId: {
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER
    },
});

module.exports = Review;