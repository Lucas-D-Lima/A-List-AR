const Anime = require('../model/Anime')
const User = require('../model/User')

module.exports = {
    async index(req, res){
        const anime = await Anime.findAll({
            attributes: {exclude: [ 'createdAt', 'updatedAt']}
        })
        res.json(anime)
    },
    
    async store(req, res){
        try{
        let {name, gender, year} = req.body;

        const anime = await Anime.create( {name, gender, year} )

        res.json(anime)}
        catch(error){
            res.status(500).send(error)
        }
    },
    async storeAnimes(req, res){
        try{
        const {user_id, anime_id} = req.body;

        const user = await User.findByPk(user_id,  {attributes: {exclude: ['name', 'password', 'email', 'createdAt', 'updatedAt']}});

        if(!user){
            return res.status(400).json({error: "User not found"})
        }

        const [animes] = await Anime.findAll({
            where: anime_id,
            attributes: {exclude: [ 'createdAt', 'updatedAt', 'name', 'gender', 'year']}
        })
        await user.addAnime(animes)
        res.status(200).json({message: "Ok"})}
        catch(error){
            res.status(500).send(error)
        }
    }
}