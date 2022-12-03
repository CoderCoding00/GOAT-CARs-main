const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Auction extends Model { }

Auction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_end: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time_end: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        // active boolean for auction data default true 

        starting_bid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        current_bid: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        bider_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        car_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'car',
                key: 'id'
            }
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },

    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'auction'
    }
);

module.exports = Auction;
