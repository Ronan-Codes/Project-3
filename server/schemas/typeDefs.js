const { gql } = require('apollo-server-express');
const typeDefs = gql`

    scalar Upload

    type Photo {
        _id: ID
        photoName: String!
        mimetype: String!
        encoding: String!
        #postedAt: String
    }
    type User {
        _id: ID
        username: String!
        description: String
        password: String!
        email: String!
        profilePhoto: Photo
        photos: [Photo]
        following: [User]
        followers: [User]
        followingCount: Int
        followersCount: Int
    }
    type Auth {
        token: ID!
        user: User
      }
      
    type Query {
       photos: [Photo]
       userPhotos(userId: ID): User
       users: [User]
    }
    type Mutation {
        addPhoto(photo: Upload!, userId: String): Boolean
        addProfilePhoto(photo: Upload!, userId: String): Boolean
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(description: String): User
        addFollowing(followingId: ID!): User
        unfollow(followingId: ID!): User
        addFollower(followerId: ID!): User
    }

`

module.exports = typeDefs;