const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {getRedis, setRedis} = require('../database/redisConfig')
const userSQL = require('./functions/getUserProfile')

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
        try{
        const {user_id} = req.params

        const userRedis = await getRedis(`user-${user_id}-profile`);

        if(!userRedis){
            const user = await userSQL(user_id)
            await setRedis(`user-${user_id}-profile`, JSON.stringify(user), 10);

            return res.json(user)
        }
        const user = JSON.parse(userRedis);
        return res.json(user)

    }catch(err){
        return res.status(500).send(err)
        
    }
    }
}