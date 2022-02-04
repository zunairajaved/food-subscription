'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoicImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InvoicImage.init({
    invoiceId: DataTypes.INTEGER,
    status:{type:DataTypes.ENUM({
      values:['pending','approved','re-upload']
    }),
  defaultValue:'pending'},
  imagePath:{
    type:DataTypes.STRING,
    allowNull:false
  }
  }, {
    sequelize,
    modelName: 'InvoicImage',
  });
  return InvoicImage;
};