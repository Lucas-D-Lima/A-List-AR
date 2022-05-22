const Sequelize = require('sequelize')
const dbconfig = require('../config/database')

const User = require('../model/User')
const Anime = require ('../model/Anime')

const connection = new Sequelize(dbconfig)

User.init(connection)
Anime.init(connection)

User.associate(connection.models)
Anime.associate(connection.models)

module.exports = connection