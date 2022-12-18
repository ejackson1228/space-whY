const { Schema, model } = require('mongoose');
const formatDate = require('../utils/dateFormat');
const commentSchema = require('./Comment');
const likeSchema = require('./Like');

const inklingSchema = new Schema (
    {
        inklingText: {
            type: String,
            required: "Empty Inklings are not supported",
            minLength: 1,
            maxLength: 400
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: timestamp => formatDate(timestamp)
        },
        username: {
            required: true,
            type: String
        },
        comments: [commentSchema], //still need to make comment schema
        likes: [likeSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

inklingSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

inklingSchema.virtual('likeCount').get(function() {
    return this.likes.length;
});

const Inkling = model('Inkling', inklingSchema);

module.exports = Inkling;

