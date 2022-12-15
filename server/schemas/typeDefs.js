const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        username: String
        email: String
        age: Int
        friends: [User]
        posts: [Post]
        friendCount: Int
        postCount: Int
    }

    type Profile {
        user: User
        avatar: String
        bio: String
        song: String
        links: [String]
        categories: [String]
        createdAt: String
    }

    type Post {
        postText: String
        createdAt: String
        username: String
        
    }
` 
// createdAt ^ might need a custom scalar type to query the date. https://stackoverflow.com/questions/49693928/date-and-json-in-type-definition-for-graphql
