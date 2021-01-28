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
    async (req, res, next) => {
        try {
            const cookies = req.cookies.token
            if (!cookies) {
                res.send(`Вы не авторизованы <a href='/adminpanel'>Авторизоваться<a>`)
            }
            const decoded = await jwt.verify(cookies, jwtKey)
            if (cookies && decoded.role == 'superadmin') {
                next()
            } else {
                res.redirect('/')
            }
        } catch (error) {
            console.log(error)
        }
    }, mainController.createArticlePage)

api.get('/adminpanel', async (req, res, next) => {
    try {
        const cookies = req.cookies.token

        if (!cookies) {
            next()
        }
        if (cookies) {
            const decoded = await jwt.verify(cookies, jwtKey)
            if (decoded.role === 'superadmin') {
                res.redirect('/adminpanel/create_article')
            } else {
                res.redirect('/')
            }
        }
    } catch (e) {
        console.log(e)
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
api.post('/adminpanel/login', loginController.checkUser)
api.post('/adminpanel/registration', loginController.registration)
api.post('/adminpanel/create_article/publishToSite', upload.single('articleImg'), createArticleController.createArticle)

module.exports = api