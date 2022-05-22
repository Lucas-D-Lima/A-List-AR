const { Model, DataTypes } = require('sequelize')

class User extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            //birthday: DataTypes.DATEONLY,
            password: DataTypes.STRING,
        },{
            sequelize
        })
    }
    static associate(models){
        this.belongsToMany(models.Anime, {
            through: 'user_animes',
            as: 'animes',
            foreignKey: 'user_id',
            otherKey: 'anime_id'
        })
    }
}

module.exports = User;