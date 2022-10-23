'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {

        static associate (models) {
        }
    };
    Booking.init({
        statusId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        patientId: DataTypes.INTEGER,
        patientFullName: DataTypes.STRING,
        phone: DataTypes.STRING,
        reason: DataTypes.STRING,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};