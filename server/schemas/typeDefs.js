const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        username: String
        email: String
        age: Int
        friends: [User]
        inklings: [Inkling]
        friendCount: Int
        inklingCount: Int
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

    type Inkling {
        _id: ID
        inklingText: String
        createdAt: String
        username: String
        comments: [Comment]
        likes: [Like]
        commentCount: Int
        likeCount: Int
        image: String
    }

    type Comment {
        _id: ID
        commentBody: String
        username: String
        createdAt: String
    }

    type Like {
        username: String
        user_id: ID
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        inklings(username: String): [Inkling]
        inkling(_id: ID!): Inkling
        profile(user: ID!): Profile
        profiles: [Profile]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addInkling(inklingText: String!): Inkling
        addProfile(user: ID!): Profile
        addComment(inklingId: ID!, commentBody: String!): Inkling
        addLike(inklingId: ID!): Inkling
        addFriend(friendId: ID!): User
    }
` 
// createdAt ^ might need a custom scalar type to query the date. https://stackoverflow.com/questions/49693928/date-and-json-in-type-definition-for-graphql


module.exports = typeDefs;