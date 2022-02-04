'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subscription.belongsTo(models.User,{
        foreignKey:'userId',
        as:'users'
      });
    };
  }
  Subscription.init({
    userId: {type:DataTypes.INTEGER,
      allowNull:false
    },
    menuId: {type:DataTypes.INTEGER,
      allowNull:false
    },
    startDate:{
      type:DataTypes.DATE,
    },
    endDate:{
      type:DataTypes.DATE
    },
    plan:{
      type:DataTypes.ENUM({
        values:['weekly','monthly','bi-weekly']
      }),
      defaultValue:'weekly'
    },
    status:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    }
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};