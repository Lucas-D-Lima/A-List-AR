const bcrypt = require('bcrypt')

const User = require('../model/User')

module.exports = {
    async index(req, res){
        //const {pk} = req.params.id
        const user = await User.findAll({
            attributes: {exclude: ['password', 'email', 'updatedAt']}
        })


        res.json(user)
    },
    async store(req, res){
        let {name, email, birthday, password} = req.body;

        password =  await bcrypt.hash(password, 10)

        const user = await User.create( {name, email, password} )

        res.json(user)
    },
    async profile(req, res){
        const {user_id} = req.params

        const user = await User.findByPk(user_id, {
            attributes: {
                exclude: ['password', 'email', 'updatedAt'],
            }, include: {
                association : 'animes', 
                attributes: ['name', 'id'],
                through: { 
                    attributes: []
                  }}
        })

        res.json(user)
    }
}