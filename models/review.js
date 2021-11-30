const { DataTypes } = require('sequelize');
const db = require("../db");

const Reviews = db.define("reviews", {
    nameOfDrink: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reviewEntry: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.INTEGER
    }
});

module.exports = Reviews;