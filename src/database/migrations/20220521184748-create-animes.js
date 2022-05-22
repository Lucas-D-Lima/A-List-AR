'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('animes', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull : false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year:{
        type: Sequelize.INTEGER,
        allowNull: false
      },      
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }  
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('animes');
  }
};
