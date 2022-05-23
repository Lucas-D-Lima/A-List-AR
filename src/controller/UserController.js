const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')
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
        try{
        let {name, email, birthday, password} = req.body;

        password =  await bcrypt.hash(password, 10)

        const user = await User.create( {name, email, password} )

        const token = jwt.sign({id: user.id}, authConfig.hash, {
            expiresIn: 86400
        })

        res.json({
            user_id: user.id,
            token: token
        })}
        catch(err){
            res.status(500).send({err})
        }
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
    },
    async recoverPassword(req, res){
        const {email} = req.body

        const user = await User.findOne({
            where: email}
        )
    }
}