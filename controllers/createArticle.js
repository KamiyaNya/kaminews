const {
    validationResult
} = require('express-validator')

const Article = require('../models/Article')

module.exports.createArticle = async function (req, res) {
    try {

        const articleTitle = req.body.articleTitle
        const articleBody = req.body.articleBody
        const articleImgSrc = req.file ? req.file.path : ''
        const articleImgSrcCorrectPath = articleImgSrc.replace(String.fromCharCode(92), '/')
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
            articleBody: articleBody,
            articleDate: new Date(Date.now()),
            imageSrc: articleImgSrcCorrectPath

        })
        await newArticle.save()
        res.status(200).redirect('/')
    } catch (e) {
        console.log(e)
    }

}