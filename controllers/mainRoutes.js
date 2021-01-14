module.exports.mainPage = function (req, res) {
    res.render('index', {
        title: 'Главная страница'
    })
}

module.exports.loginPage = function (req, res) {
    res.render('loginPage', {
        title: 'Войти',
        method: 'POST',
        actionUrl: '/check_user'
    })
}
module.exports.createArticlePage = function (req, res) {
    res.render('createArticle', {
        title: 'Добавить новость',
        method: 'POST',
        actionUrl: '/publishToSite'
    })
}