'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.belongsToMany(models.Dish,{
        through:'DishMenu',
        as:'dishes',
        foreignKey:'menuId'
      });
      // Menu.hasOne(models.Subscription,{
      //   foreignKey:'menuId',
      //   as:'subscriptions',
      //   onDelete:'CASCADE'
      // });
    };
  }
  Menu.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};