const {
    Router
} = require('express')
const {
    body
} = require('express-validator')
const passport = require('passport')

const mainController = require('../controllers/mainRoutes')
const loginController = require('../controllers/loginController')
const createArticleController = require('../controllers/createArticle')
const getArticlesConstroller = require('../controllers/getArticles')

const api = Router()

api.get('/', mainController.mainPage)
api.get('/news', getArticlesConstroller.getArticles)
api.get('/news/:id', getArticlesConstroller.getArticleById)
api.get('/create_article', passport.authenticate('jwt', {
    failureRedirect: '/adminsobakapanel',
    session: false
}), mainController.createArticlePage)
api.get('/adminsobakapanel', mainController.loginPage)
api.post('/check_user', loginController.checkUser)
api.post('/publishToSite', [
    body('articleTitle').not().isEmpty().withMessage("Заголовок не может быть пустым"),
    body('articleBody').not().isEmpty().withMessage("тело не может быть пустым")
], createArticleController.createArticle)



module.exports = api