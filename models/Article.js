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
    typeOfArticles: {
        type: [String],
        default: ['']
    },
    articleDate: {
        type: Date,

    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
})

module.exports = model("Article", article)