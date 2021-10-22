'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'idNumber',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'users',
        'cellNumber',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'users',
        'emailAddress',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'users',
        'password',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'idNumber'),
      queryInterface.removeColumn('users', 'cellNumber'),
      queryInterface.removeColumn('users', 'emailAddress'),
      queryInterface.removeColumn('users', 'password')
    ]);
  }
};
