const Article = require('../models/Article')

module.exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find({}).lean()
        res.render('articlesPage', {
            title: 'Новости',
            articles,
            id: articles._id
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
        res.render('articlePage', {
            title: articles.articleTitle,
            id: postId,
            articleTitle: articles.articleTitle,
            articleBody: articles.articleBody
        })
    } catch (error) {
        if (error) {
            console.log(error)
        }
    }

}