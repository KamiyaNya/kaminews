const {
    Router
} = require('express')

const api = Router()

api.get('/', (req, res) => {
    res.render('main', {
        title: 'MainPage'
    })
})

module.exports = api