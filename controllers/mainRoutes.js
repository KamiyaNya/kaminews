module.exports.mainPage = function (req, res) {
    res.render('index', {
        title: 'Главная страница',
        checkAdmin: true
    })
}

module.exports.loginPage = function (req, res) {
    res.render('loginPage', {
        title: 'Войти',
        method: 'POST',
        actionUrl: '/adminsobakapanel/check_user',
        checkAdmin: true
    })
}
module.exports.createArticlePage = function (req, res) {
    res.render('createArticle', {
        title: 'Добавить новость',
        method: 'POST',
        actionUrl: '/adminsobakapanel/create_article/publishToSite',
        logout: true
    })

}