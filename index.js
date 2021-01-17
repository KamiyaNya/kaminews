// Import modules
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const cors = require('cors')
const io = require('socket.io')
const cookieParser = require('cookie-parser')



// Import files from project
const config = require('./config.json')
const router = require('./routes/route')

// Init variables
const PORT = process.env.PORT || 3000

const dataBaseUrl = config.dataBaseUrl

// Create app
const app = express()
app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())

// Init view engine express-hbs
const hbs = exphbs.create({
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(flash())

// Use parser
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(passport.initialize())
<<<<<<< HEAD
require('./middleware/passport')(passport)
app.use(
    session({
        secret: "adminrealsobaka",
        saveUninitialized: true,
        resave: true
    })
)

app.use(cors())
=======
app.use(passport.session())
require('./middleware/passport')(passport)
// const MongoStore = require('connect-mongo')(session)
// app.use(
//     session({
//         secret: "adminrealsobaka",
//         saveUninitialized: true,
//         resave: true,
//         store: new MongoStore({
//             mongooseConnection: mongoose.connection
//         })
//     })
// )
// app.use((req, res, next) => {
//     req.session
// })
>>>>>>> login-fix

//Use our routes
app.use(router)

const start = async () => {
    try {
        // waiting to connect to database
        await mongoose.connect(dataBaseUrl, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        // start server
        app.listen(PORT, () => {
            console.log(`Server start on ${PORT}`)
        })
    } catch (e) {
        console.log(e);
    }
}
start()