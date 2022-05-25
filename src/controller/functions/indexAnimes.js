const Anime = require('../../model/Anime')

async function animeSQL(){
    const animes =  await Anime.findAll({
        attributes: {exclude: [ 'createdAt', 'updatedAt']}})
    return animes
}

module.exports = animeSQL