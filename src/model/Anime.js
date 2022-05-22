const { Model, DataTypes } = require('sequelize')


class Anime extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            gender: DataTypes.STRING,
            year: DataTypes.INTEGER
        },{
            sequelize
        })
    }

    static associate(model){
        this.belongsToMany(model.User, {
            through: 'user_animes',
            as: 'users',
            foreignKey: 'anime_id',
            otherKey: 'user_id'
        })
    }
}

module.exports = Anime;