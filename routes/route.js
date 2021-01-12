const {
    Router
} = require('express')

const api = Router()

api.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная страница'
    })
})
api.get('/news', (req, res) => {
    res.render('articlesPage', {
        title: 'Новости'
    })
})

module.exports = api