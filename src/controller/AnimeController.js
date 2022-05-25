const Anime = require('../model/Anime')
const User = require('../model/User')

const {getRedis, setRedis} = require('../database/redisConfig')
const animeSQL = require("./functions/indexAnimes")

module.exports = {
    async index(req, res){
        const redisAnime = await getRedis('animes')

        if(!redisAnime){
            const animes = await animeSQL()
            await setRedis('animes', JSON.stringify(animes), 60)

            return res.json(animes)
        }
        const animes = JSON.parse(redisAnime)
        return res.json(animes)
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