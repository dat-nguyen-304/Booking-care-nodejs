'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MarkDown extends Model {

        static associate (models) {
            MarkDown.belongsTo(models.User, { foreignKey: 'doctorId' })
        }
    };
    MarkDown.init({
        contentHTML: DataTypes.TEXT('long'),
        contentMarkDown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        doctorId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Markdowns',
        freezeTableName: true
    });
    return MarkDown;
};