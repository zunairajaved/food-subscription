'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Users', 
          key: 'id' 
        },
        onDelete: 'CASCADE',
      },
      menuId: {
          type: Sequelize.INTEGER,
          references: { 
            model: 'Menus', 
            key: 'id' 
          },
          onDelete: 'CASCADE',
      },
      startDate:{
        type:Sequelize.DATE,
      },
      endDate:{
        type:Sequelize.DATE
      },
      plan:{
        type:Sequelize.ENUM({
          values:['weekly','monthly','bi-weekly']
        }),
        default:'weekly'
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
    await queryInterface.dropTable('Subscriptions');
  }
};