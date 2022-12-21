const { Schema } = require('mongoose');

const likeSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        }
    }
);

module.exports = likeSchema;