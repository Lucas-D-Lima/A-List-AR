const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mailer = require('../modules/mailer')

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
    },
    async recoverPassword(req, res){
        try{
        const {email} = req.body

        const user = await User.findOne({
            where: {email:email},
        attributes:{
            exclude: ['password', 'createdAt', 'updatedAt', ]
        }}
        )
        if(!user){
            return res.status(404).send("User not exist")
        }
        //Create token
        let now = new Date()
        now.setHours(now.getHours()+1)
        const recoverToken = jwt.sign({id: user.id, email:user.email, time: now}, authConfig.hash, {
            expiresIn: 3600
        })

        const name = user.name
        mailer.sendMail({
            to: user.email,
            from: 'password-recover@alistar.com',
            template: 'auth/forgotPassword',
            context: {name, recoverToken}
        }, (err)=>{
            if(err){return res.send(err)}
        })
        res.status(200).send()}
        catch(error){
            return res.send(error)
        }
    },
    async changePasswordByToken(req, res){
        try{
        const {token, password} = req.body 
        
        const hashedPassword =  await bcrypt.hash(password, 10)

        if(!token){
            return res.status(401).json({msg: "No token"})
        }

        const {id, email, time} = jwt.verify(token, authConfig.hash, (err, decode)=>{
            if(err) { return res.status(401).send({error: "Token invalid"})}

            return {id: decode.id, email: decode.email, time: decode.time}
        })

        const now = new Date
        console.log(now)

        if(!time>now){
            return res.json({err: "Time expired"})
        }
        
        const user = await User.findByPk(id)

        await user.update({password: hashedPassword})

        return res.status(200).send(user)

        }catch(error){
            return res.status(500).send(error)
        }

    } 
}