'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dependent extends Model {
    static associate(models) {
      // define association here
      Dependent.belongsTo(models.User,{
        as: 'user',
        foreignKey: 'userId' 
      });
    }
  };
  Dependent.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    cellNumber: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dependent',
  });
  return Dependent;
};