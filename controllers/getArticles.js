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

        const getDate = () => {
            try {
                const articleDate = articles.articleDate
                moment.locale('ru')
                const beautify = moment(articleDate).format('DD MMMM YYYY, h:mm:ss')
                return beautify
            } catch (e) {
                if (e) {
                    res.json({
                        Error: `Server error ${e}`
                    })
                }
            }

        }
        const getTags = () => {
            try {
                const getAllTags = articles.typeOfArticles
                console.log(getAllTags)
                const allTags = []
                for (let tags = 0; tags < getAllTags.length; tags++) {
                    if (getAllTags == '') {
                        return "Теги не обнаружены"
                    } else {
                        allTags.push(getAllTags[tags])
                    }
                }
                console.log(allTags)
                return allTags.toString()
            } catch (e) {
                if (e) {
                    res.json({
                        Error: `Server error ${e}`
                    })
                }
            }

        }
        const articleImg = articles.imageSrc
        const articleImgRep = articleImg.replace("\\", "/")
        console.log(articleImgRep)

        res.render('articlePage', {
            title: articles.articleTitle,
            id: postId,
            articleTitle: articles.articleTitle,
            articleBody: articles.articleBody,
            articleImg: articleImgRep,
            artileTags: getTags(),
            articleDate: getDate(),
            checkAdmin: true
        })
    } catch (error) {
        if (error) {
            console.log(error)
        }
    }

}