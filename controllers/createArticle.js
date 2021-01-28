const Article = require('../models/Article')

module.exports.createArticle = async function (req, res) {
    try {

        const articleTitle = req.body.articleTitle
        const articleBody = req.body.articleBody
        const articleImgSrc = req.file ? req.file.path : ''
        const articleImgSrcCorrectPath = articleImgSrc.replace(String.fromCharCode(92), '/')
        for (let i = 0; i < articleTitle.length; i++) {
            if (articleTitle.length < 5) {
                res.status(400).json({
                    message: 'Длина заголовка не меньше 5 символов'
                })
            }
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