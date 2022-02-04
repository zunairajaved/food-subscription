'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DishMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DishMenu.init({
    dishId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Dishes',
        key:'id'
      }
    },
    menuId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'menues',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'DishMenu',
  });
  return DishMenu;
};