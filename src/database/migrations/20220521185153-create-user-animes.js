'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_animes', { 
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull : false,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: {model: 'users', key: 'id'},
        onUpdated: 'CASCADE',
        onDeleted: 'CASCADE'
      },
      anime_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refereces: {model: 'animes', key: 'id'},
        onUpdated: 'CASCADE',
        onDeleted: 'CASCADE'
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
    await queryInterface.dropTable('user_animes');
    
  }
};
