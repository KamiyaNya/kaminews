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
    // user: {
    //     ref: user,
    //     _id: Schema.Types.ObjectId,
    //     username: email
    // }
})

module.exports = model("Article", article)