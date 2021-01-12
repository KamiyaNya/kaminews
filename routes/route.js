const {
    Router
} = require('express')

const controller = require('../controllers/mainRoutes')

const api = Router()

api.get('/', controller.mainPage)
api.get('/news', controller.newsPage)
api.get('/article:id', controller.articlePage)

module.exports = api