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
api.get('/adminsobakapanel/create_article', (req, res, next) => {
    const cookies = req.cookies.token
    console.log('token from cookie : ' + cookies)
    res.header({
        'Authorization': `Bearer ${cookies}`
    })
    next()
}, passport.authenticate('jwt', {
    session: false
}), mainController.createArticlePage)

api.get('/adminsobakapanel', mainController.loginPage)
api.post('/adminsobakapanel/check_user', loginController.checkUser)
api.post('/publishToSite', [
    body('articleTitle').not().isEmpty().withMessage("Заголовок не может быть пустым"),
    body('articleBody').not().isEmpty().withMessage("тело не может быть пустым")
], createArticleController.createArticle)



module.exports = api