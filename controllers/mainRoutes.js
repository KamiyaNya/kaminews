module.exports.mainPage = function (req, res) {
    res.render('index', {
        title: 'Главная страница'
    })
}
module.exports.newsPage = function (req, res) {
    res.render('articlesPage', {
        title: 'Новости'
    })
}
module.exports.articlePage = function (req, res) {
    res.render('articlePage', {
        title: 'Новость'
    })
}