'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InvoicImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoiceId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Invoices', 
          key: 'id' 
        },
      },
      imagePath:{
        type:Sequelize.STRING,
        allowNull:false
      },
      status:{
        type:Sequelize.ENUM({
          values:['pending','approved','re-upload']
        }),
        default:'pending'
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InvoicImages');
  }
};