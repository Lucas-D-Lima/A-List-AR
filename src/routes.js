const express = require("express")

const authMiddleware = require('./middleware/auth')

const UserController = require('./controller/UserController')
const AnimeController = require('./controller/AnimeController')
const AuthController = require('./controller/AuthController')

const routes = express.Router()

//User routes
routes.post('/user', UserController.store)
routes.get('/user', UserController.index)
routes.post('/user/anime',authMiddleware, AnimeController.storeAnimes)
routes.get('/users/:user_id', UserController.profile)

routes.post('/auth', AuthController.login)

//Anime Routes
routes.post('/animes', AnimeController.store)
routes.get('/animes', AnimeController.index)

module.exports = routes;