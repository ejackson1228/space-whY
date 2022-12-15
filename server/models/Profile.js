const { Schema, Model } = require('mongoose');
const formatDate = require('../utils/dateFormat');

const profileSchema = new Schema (
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        avatar: {
            type: String,
            default: null //avatars TBD
        },
        bio: {
            type: String,
            maxLength: 300,
            trim: true,
        },
        song: {
            type: String,
            trim: true,
        },
        links: [
            {
                type: String,
                trim: true
            }
        ],
        categories: [ // type of content on the profile (news, sports, etc.)
            {
                type: String,
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now(),
            get: timestamp => formatDate(timestamp)
        }

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    }
);


// attempting to get lifespan of profile to display alongside badge 
// profileSchema.virtual('lifespan').get(function() {
//     Date.now() - 
// })

const Profile = Model('Profile', profileSchema);

module.exports = Profile;