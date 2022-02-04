'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn( 'Subscriptions', 'status', Sequelize.BOOLEAN , {default:true} );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
