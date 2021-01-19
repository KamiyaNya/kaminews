const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
            res.status(404).send(`<p>Пользователь ${username} не найден <a href="/login">Вернуться</a><p>`)
        }
        const validPassword = await bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            res.status(401).send(`<p>Пароль не совпал <a href="/login">Вернуться</a></p>`)
        }
        const token = jwt.sign({
            userId: user._id,
            username: user.email
        }, jwtKey, {
            expiresIn: '1h'
        })

        await res.cookie('token', `${token}`, {
            maxAge: 1800000,
            httpOnly: true
        })
        setTimeout(() => {
            res.redirect('/adminsobakapanel/create_article')
        }, 1000)
    } catch (e) {
        console.log(e)
    }

}