const { user } = require('pg/lib/defaults')
const Sequelize = require('sequelize')
const dbconfig = require('../config/database')

const User = require('../model/User')

const connection = new Sequelize(dbconfig)

User.init(connection)

module.exports = connection