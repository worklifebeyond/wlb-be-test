'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Likes', 'count');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Likes', 'count', Sequelize.INTEGER);
  }
};
