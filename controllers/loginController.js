const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const jwtKey = require('../config.json').secretJWTKey

module.exports.checkUser = async function (req, res) {
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
        res.json(token)
        // res.redirect('/create_article')

    } catch (e) {
        console.log(e)
    }

}