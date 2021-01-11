// Import modules
const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')

// Import files from project
const config = require('./config.json')
const router = require('./rouinittes/route')

// Init variables
const PORT = process.env.PORT || 3000
const dataBaseUrl = config.dataBaseUrl

// Create app
const app = express()

// Init view engine ejs
app.set('view engine', 'ejs')

app.use(express.urlencoded({
    extended: true
}))

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