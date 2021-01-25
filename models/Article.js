const {
    model,
    Schema
} = require('mongoose')

const article = new Schema({
    articleTitle: {
        type: String,
        required: true,
    },
    articleBody: {
        type: String
    },
    articleDate: {
        type: Date,

    },
    imageSrc: {
        type: String,
        default: ''
    }
    // ,
    // user: {
    //     ref: 'User',
    //     type: Schema.Types.ObjectId
    // }
})

module.exports = model("Article", article)