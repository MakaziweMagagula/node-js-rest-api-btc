'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    gender: DataTypes.STRING,
    idNumber: DataTypes.STRING,
    cellNumber: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Dependent,{
      as: 'dependents',
      foreignKey: 'userId'
    });
  };
  return User;
};