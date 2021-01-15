// Import modules
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const cors = require('cors')

// Import files from project
const config = require('./config.json')
const router = require('./routes/route')

// Init variables
const PORT = process.env.PORT || 3000
const dataBaseUrl = config.dataBaseUrl

// Create app
const app = express()

app.use(express.static(__dirname + '/public'))

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
require('./middleware/passport')(passport)
app.use(
    session({
        secret: "adminrealsobaka",
        saveUninitialized: true,
        resave: true
    })
)

app.use(cors())

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