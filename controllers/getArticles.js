const moment = require('moment')

const Article = require('../models/Article')

module.exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find({}).lean()
        res.render('articlesPage', {
            title: 'Новости',
            articles,
            id: articles._id,
            checkAdmin: true
        })
    } catch (e) {
        if (e) {
            console.log(e)
        }
    }
}
module.exports.getArticleById = async (req, res, next) => {
    try {
        const postId = req.params.id
        const articles = await Article.findById({
            _id: postId
        })
        // Функция для вытаскивания даты и приведения его в нормальный вид
        const getDate = () => {
            try {
                const articleDate = articles.articleDate
                moment.locale('ru')
                const beautify = moment(articleDate).format('DD MMMM YYYY')
                return beautify
            } catch (e) {
                if (e) {
                    res.json({
                        Error: `Server error ${e}`
                    })
                }
            }
        }
        // Вытаскивание картинок из БД
        const getImg = () => {
            const articleImg = articles.imageSrc
            const articleImgRep = articleImg.replace(String.fromCharCode(92), '/')
            return articleImgRep
        }
        // Рендер страницы
        res.render('articlePage', {
            title: articles.articleTitle,
            id: postId,
            articleTitle: articles.articleTitle,
            articleBody: articles.articleBody,
            articleImg: getImg(),
            articleDate: getDate(),
            checkAdmin: true
        })
    } catch (error) {
        if (error) {
            console.log(error)
        }
    }
}