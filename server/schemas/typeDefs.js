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
        comments: [Comment]
        likes: [Like]
        commentCount: Int
        likeCount: Int
    }

    type Comment {
        commentBody: String
        username: String
        createdAt: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        posts(username: String): [Post]
        post(_id: ID!): Post
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(postText: String!): Post
        addProfile(user: User!): Profile
        addComment(postId: ID!, commentBody: String!): Post
        addLike(postId: ID!, username: String!): Post
        addFriend(friendId: ID!): User
    }
` 
// createdAt ^ might need a custom scalar type to query the date. https://stackoverflow.com/questions/49693928/date-and-json-in-type-definition-for-graphql


module.exports = typeDefs;