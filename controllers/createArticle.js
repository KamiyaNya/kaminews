const {
    validationResult
} = require('express-validator')

const Article = require('../models/Article')

module.exports.createArticle = async function (req, res) {
    try {

        const articleTitle = req.body.articleTitle
        const articleBody = req.body.articleBody
        const typeOfArticles = req.body.typeOfArticles
        const trim = typeOfArticles.split(' ')
        const articles = []
        for (let i = 0; i < trim.length; i++) {
            articles.push(trim[i])
        }
        console.log(articleTitle)
        console.log(articleBody)
        console.log(typeOfArticles)
        // console.log(imageSrc)
        const errors = validationResult(res)
        if (!errors.isEmpty()) {
            res.status(422).json({
                error: errors
            })
        }
        if (!articleTitle) {
            res.status(400).json({
                message: "Пустой заголовок"
            })
        }
        if (!articleBody) {
            res.status(400).json({
                message: "Пустое тело новости"
            })
        }
        console.log(req.user)
        const newArticle = Article({
            articleTitle: articleTitle,
            articleBody: articleBody,
            typeOfArticles: articles,
            articleDate: new Date(Date.now()),
            imageSrc: req.file ? req.file.path : ''

        })
        await newArticle.save()
        res.status(200).send(`Новость добавлена, Тема новости <strong>'${articleTitle}'</strong>, телo новости '<strong>${articleBody}</strong>', <a href='/adminsobakapanel/create_article'>Вернуться</a>`)
    } catch (e) {
        console.log(e)
    }

}