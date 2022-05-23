const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')
const User = require('../model/User')

module.exports = {
    async login(req, res){
        try{
        const {email, password} = req.body;

        const user = await User.findOne({
            where:{ email: email},
            attributes: {exclude: ['name', 'createdAt', 'UpdatedAt']}
        })

        if(!user){
            return res.status(404).json({error: "User not found, email is invalid"})
        }
        if(!await bcrypt.compare(password, user.password)){
            return res.status(401).send({error: "Password is invalid"})
        }
        
        const token = jwt.sign({id: user.id}, authConfig.hash, {
            expiresIn: 86400
        })
        res.json({
            user_id: user.id,
            token: token
        })}
        catch(error){
            res.status(500).send(error)
        }
    }
}