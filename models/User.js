const {
    model,
    Schema
} = require('mongoose')

const user = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username:{
      type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user'
    }
})

module.exports = model('User', user)
