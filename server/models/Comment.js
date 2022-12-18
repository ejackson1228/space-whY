const { Schema } = require('mongoose');
const formatDate = require('../utils/dateFormat');

const commentSchema = new Schema (
    {
        commentBody: {
            type: String,
            maxLength: 280,
            minLength: 1,
            required: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: timestamp => formatDate(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = commentSchema;