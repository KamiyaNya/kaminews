const {
    Router
} = require('express')
const {
    body
} = require('express-validator')
const jwt = require('jsonwebtoken')

const mainController = require('../controllers/mainRoutes')
const loginController = require('../controllers/loginController')
const createArticleController = require('../controllers/createArticle')
const getArticlesConstroller = require('../controllers/getArticles')
const jwtKey = require('../config.json').secretJWTKey

const api = Router()

api.get('/', mainController.mainPage)
api.get('/news', getArticlesConstroller.getArticles)
api.get('/news/:id', getArticlesConstroller.getArticleById)
api.get('/adminsobakapanel/create_article',
    (req, res, next) => {
        const cookies = req.cookies.token
        if (!cookies) {
            res.send(`Вы не авторизованы <a href='/adminsobakapanel'>Авторизоваться<a>`)
        } else {
            jwt.verify(cookies, jwtKey)
        }
        next()
    }, mainController.createArticlePage)

api.get('/adminsobakapanel', (req, res, next) => {
    if (req.cookies.token) {
        res.redirect('/adminsobakapanel/create_article')
    } else {
        next()
    }
}, mainController.loginPage)
api.get('/logout', async (req, res) => {
    cookie = req.cookies
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }
        res.cookie(prop, '', {
            expires: new Date(0)
        })
    }
    res.redirect('/');
})
api.post('/adminsobakapanel/check_user', loginController.checkUser)
api.post('/adminsobakapanel/create_article/publishToSite', [
    body('articleTitle').not().isEmpty().withMessage("Заголовок не может быть пустым"),
    body('articleBody').not().isEmpty().withMessage("тело не может быть пустым")
], createArticleController.createArticle)

module.exports = api