const express = require("express")

const UserController = require('./controller/UserController')
const AnimeController = require('./controller/AnimeController')

const routes = express.Router()

//User routes
routes.post('/user', UserController.store)
routes.get('/user', UserController.index)
routes.post('/user/anime', AnimeController.storeAnimes)
routes.get('/users/:user_id', UserController.profile)

//Anime Routes
routes.post('/animes', AnimeController.store)
routes.get('/animes', AnimeController.index)

module.exports = routes;