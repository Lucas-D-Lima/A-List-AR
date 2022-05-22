require('dotenv').config()

module.exports  = {
    dialect : 'postgres',
    username : process.env.DB_USERNAME,
    host : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    define : {
        timestamps : true,
        underscored: true,
    }
}