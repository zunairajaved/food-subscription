'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn( 'UserMeals', 'dishId', Sequelize.INTEGER );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn( 'UserMeals', 'dishId', Sequelize.INTEGER );
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
