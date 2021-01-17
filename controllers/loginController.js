const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const request = require('request')

const User = require('../models/User')
const jwtKey = require('../config.json').secretJWTKey

module.exports.checkUser = async function (req, res, next) {
    try {
        const username = req.body.username
        const password = req.body.password
        const user = await User.findOne({
            email: username
        })
        if (!user) {
            res.status(404).send(`Пользователь ${username} не существует`)
            // send(`<p>Пользователь ${username} не найден <a href="/login">Вернуться</a><p>`)
        }
        const validPassword = await bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            res.status(401).send("Пароль не верный")
            // send(`<p>Пароль не совпал <a href="/login">Вернуться</a></p>`)
        }
        const token = jwt.sign({
            userId: user._id,
            username: user.email
        }, jwtKey, {
            expiresIn: '1h'
        })

        await res.cookie('token', `${token}`)
        console.log('real token : ' + token)
        res.redirect('/adminsobakapanel/create_article')
    } catch (e) {
        console.log(e)
    }

}