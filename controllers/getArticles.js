const Article = require('../models/Article')

module.exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find().lean()
        res.render('articlesPage', {
            title: 'Новости',
            articles,
            id: articles._id
        })
    } catch (error) {
        if (error) {
            res.status(503).json({
                message: `Ошибка сервера : ${error}`
            })
        }
    }

}
module.exports.getArticleById = async (req, res) => {
    try {
        const postId = req.params.id
        const postIdTrim = postId.split(':').join('')
        const articles = await Article.findById({
            _id: postIdTrim
        })
        res.render('articlePage', {
            id: postIdTrim,
            text: articles.articleBody
        })
    } catch (error) {
        if (error) {
            res.status(503).json({
                message: `Ошибка сервера : ${error}`
            })
        }
    }

}