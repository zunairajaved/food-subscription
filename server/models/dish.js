'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dish.belongsToMany(models.Menu,{
        through:'DishMenu',
        as:'menues',
        foreignKey:'dishId'
      });
    };
  }
  Dish.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    price: {type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Dish',
  });
  return Dish;
};