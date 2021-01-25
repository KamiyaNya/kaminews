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
const upload = require('../middleware/upload')

const api = Router()

api.get('/', getArticlesConstroller.getArticles)
api.get('/news/:id', getArticlesConstroller.getArticleById)
api.get('/adminpanel/create_article',
    (req, res, next) => {
        try {
            const cookies = req.cookies.token
            if (!cookies) {
                res.send(`Вы не авторизованы <a href='/adminpanel'>Авторизоваться<a>`)
            } else {
                jwt.verify(cookies, jwtKey)
                next()
            }
        } catch (error) {
            console.log(error)
        }
    }, mainController.createArticlePage)

api.get('/adminpanel', (req, res, next) => {
    if (req.cookies.token) {
        res.redirect('/adminpanel/create_article')
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
api.post('/adminpanel/check_user', loginController.checkUser)
api.post('/adminpanel/create_article/publishToSite', upload.single('articleImg'), createArticleController.createArticle)

module.exports = api