const {
    validationResult
} = require('express-validator')

const Article = require('../models/Article')

module.exports.createArticle = async function (req, res) {
    try {

        const articleTitle = req.body.articleTitle
        const articleBody = req.body.articleBody
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
        const newArticle = Article({
            articleTitle: articleTitle,
            articleBody: articleBody
        })
        await newArticle.save()
        res.status(200).send(`Новость добавлена, Тема новости <strong>'${articleTitle}'</strong>, телo новости '<strong>${articleBody}</strong>', <a href='/create_article'>Вернуться</a>`)
    } catch (e) {
        console.log(e)
    }

}