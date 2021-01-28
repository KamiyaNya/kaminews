const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const jwtKey = require('../config.json').secretJWTKey

module.exports.checkUser = async function (req, res, next) {
    try {
        const username = req.body.loginusername
        const password = req.body.loginpassword
        const user = await User.findOne({
            username: username
        })
        if (!user) {
            res.status(404).send(`<p>Пользователь ${username} не найден <a href="/adminpanel">Вернуться</a><p>`)
        }
        const validPassword = await bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            res.status(401).send(`<p>Пароль не совпал <a href="/adminpanel">Вернуться</a></p>`)
        }
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, jwtKey, {
            expiresIn: '1h'
        })

        await res.cookie('token', `${token}`, {
            maxAge: 1800000,
            httpOnly: true
        })
        setTimeout(() => {
            res.redirect('/adminpanel/create_article')
        }, 1000)
    } catch (e) {
        console.log(e)
    }
}

module.exports.registration = async (req, res) => {
    try {
        const userEmail = req.body.reguseremail
        const userName = req.body.regusername
        const userPassword = req.body.reguserpassword
        const candidate = await User.findOne({
            email: userEmail
        })
        if (candidate) {
            res.status(400).json({
                message: `Пользователь с email ${userEmail} уже существует`
            })
        }
        if (!userEmail) {
            res.status(400).json({
                message: `Поле "email" не может быть пустым`
            })
        }
        if (!userName) {
            res.status(400).json({
                message: `Поле "Имя пользователя" не может быть пустым`
            })
        }
        if (!userPassword) {
            res.status(400).json({
                message: `Поле "Пароль" не может быть пустым`
            })
        }
        const hashPassword = await bcrypt.hash(userPassword, 10)
        const role = await User.findOne({
            role: 'superadmin'
        })
        if (!role) {
            const userCreate = User({
                email: userEmail,
                username: userName,
                password: hashPassword,
                role: 'superadmin'
            })
            await userCreate.save()

        } else {
            const userCreate = User({
                email: userEmail,
                username: userName,
                password: hashPassword
            })
            await userCreate.save()

        }
        res.status(200).send(`Пользователь создан <a href='/adminpanel'>Войти</a>`)

    } catch (e) {
        console.log(e)
    }
}