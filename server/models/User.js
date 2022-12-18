const { Schema, Model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must be a valid email address!']
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        age: {
            type: Number
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        // notifications: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Notification'
        //     }
        // ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);
// whether user is new or modified, have bcrypt hash pw 
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});
// compare incoming vs hashed pw's
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

userSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

// userSchema.virtual('notificationCount').get(function() {
//     return this.notifications.length;
// });

const User = Model('User', userSchema);

module.exports = User;