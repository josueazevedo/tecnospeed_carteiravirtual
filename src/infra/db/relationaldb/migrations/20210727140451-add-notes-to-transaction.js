'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'transactions', 'notes',
      Sequelize.STRING
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'transactions',
      'notes'
    )
  }
}
