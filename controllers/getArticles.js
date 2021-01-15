const Article = require('../models/Article')

module.exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find({}).lean()
        // const articlesBody = await Article.findOne({
        //     articleBody: articleBody
        // })
        // let shortArticleBody = ''

        // for (let i = 0; i < articlesBody.length; i++) {
        //     //Написать цикл по перебору срок из бд
        //     shortArticleBody += articlesBody
        // }
        // console.log(shortArticleBody)
        res.render('articlesPage', {
            title: 'Новости',
            articles,
            id: articles._id
        })
    } catch (e) {
        if (e) {
            // res.status(503).json({
            //     message: `Ошибка сервера : ${error}`
            // })
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
        // res.json(req.params)
        // console.log(postIdTrim)
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