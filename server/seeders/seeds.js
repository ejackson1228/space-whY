const faker = require('faker');

const db = require('../config/connection');
const { User, Profile, Inkling } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Inkling.deleteMany({});

    // create user data
    const userData = [];

    for (let i=0; i < 50; i += 1) {
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const password = faker.internet.password();

        userData.push({ username, email, password});
    }
    console.log(userData);

    const createdUsers = await User.collection.insertMany(userData);
    console.log(createdUsers);
    console.log(createdUsers);
    //create profiles
    const profileData = [];
    for ( let i =0; i < 50; i +=1) {
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { user: userId } = createdUsers.ops[randomUserIndex];

        const categories = faker.lorem.word();
        const links = faker.internet.url();
        const bio = faker.lorem.words(Math.round(Math.random() * 20) + 1);
        const avatar = faker.image.avatar();

        profileData.push({ user: { user: userId }, categories, links, bio, avatar })
    }

   await Profile.collection.insertMany(profileData);
    
    

    // create friends 
    for (let i = 0; i < 100; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { _id: userId } = createdUsers.ops[randomUserIndex];

        let friendId = userId;

        while (friendId === userId) {
            const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
            friendId = createdUsers.ops[randomUserIndex];
        }

        await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } } );
    };

    //create Inklings
    let createdInklings = [];
    for (let i=0; i < 100; i += 1 ) {
        const inklingText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username, _id: userId } = createdUsers.ops[randomUserIndex];

        const createdInkling = await Inkling.create({ inklingText, username });

        const updatedUser = await User.updateOne(
            { _id: userId },
            { $push: { inklings: createdInkling._id }}
        );

        createdInklings.push(createdInkling);
    }

    // create comments
    for (let i = 0 ; i < 100; i += 1) {
        const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username } = createdUsers.ops[randomUserIndex];

        const randomInklingIndex = Math.floor(Math.random() * createdInklings.length);
        const { _id: inklingId } = createdInklings[randomInklingIndex];

        await Inkling.updateOne(
            { _id: inklingId },
            { $push: { comments: { commentBody, username } } },
            { runValidators: true }
        );
    }

    //create likes 
    for (let i = 0; i < 100 ; i += 1) {
        const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
        const { username, _id: user_id } = createdUsers.ops[randomUserIndex];

        const randomInklingIndex = Math.floor(Math.random() * createdInklings.length);
        const { _id: inklingId } = createdInklings[randomInklingIndex];

        await Inkling.updateOne(
            { _id: inklingId },
            { $addToSet: { likes: { username, user_id } } },
            { runValidators: true }
        )
    }

    console.log('All done!');
    process.exit(0);
})