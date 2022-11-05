'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate (models) {
      User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
      User.belongsTo(models.Allcode, { foreignKey: 'roleId', targetKey: 'keyMap', as: 'roleData' })
      User.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })

      User.hasOne(models.Markdowns, { foreignKey: 'doctorId' })
      User.hasOne(models.Doctor_Info, { foreignKey: 'doctorId' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    positionId: DataTypes.STRING,
    image: DataTypes.BLOB('long'),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};