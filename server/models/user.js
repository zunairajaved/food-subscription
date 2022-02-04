'use strict';
const {
  Model, ENUM
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Subscription,{
        foreignKey:'userId',
        as:'subscriptions',
        onDelete:'CASCADE'
      });
    };
  }
  User.init({
    fullName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
     allowNull:false,
     unique:true
},
    password: {
      type:DataTypes.STRING(64),
    allowNull:false
  },
  role:{
    type:ENUM({
      values:['client','admin']
    }),
    defaultValue:'client',
  },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};