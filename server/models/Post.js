const { Schema, Model } = require('mongoose');
const formatDate = require('../utils/dateFormat');
const commentSchema = require('./Comment');
const likeSchema = require('./Like');

const postSchema = new Schema (
    {
        postText: {
            type: String,
            required: "Empty posts are not supported",
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

postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

postSchema.virtual('likeCount').get(function() {
    return this.likes.length;
});

const Post = Model('Post', postSchema);

module.exports = Post;

