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
            res.status(404).send(`<p>Пользователь ${username} не найден <a href="/adminpanel">Вернуться</a><p>`)
        }
        const validPassword = await bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            res.status(401).send(`<p>Пароль не совпал <a href="/adminpanel">Вернуться</a></p>`)
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
            res.redirect('/adminpanel/create_article')
        }, 1000)
    } catch (e) {
        console.log(e)
    }
}

module.exports.registration = async (req,res) =>{
    try{
        const userEmail = req.body.useremail
        const userName = req.body.username
        const userPassword = req.body.userpassword
        const candidate = await Article.findOne(email: userEmail)
        if(candidate){
            res.status(400).json({message: `Пользователь с email ${userEmail} уже существует`})
        }
        if(!userEmail){
            res.status(400).json({message: `Поле "email" не может быть пустым`})
        }
        if(!userName){
            res.status(400).json({message: `Поле "Имя пользователя" не может быть пустым`})
        }
        if(!userPassword){
            res.status(400).json({message: `Поле "Пароль" не может быть пустым`})
        }
        const hashPassword = await bcrypt.hash(userPassword, 10)
        
        const userCreate = User({
            email: userEmail,
            username: userEmail,
            password: hashPassword
        }) 
        
        await userCreate.save()
        res.status(200).send(`Пользователь создан`)
        
    }catch(e){
        console.log(e)
    }
}
