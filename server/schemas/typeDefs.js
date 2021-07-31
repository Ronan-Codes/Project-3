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
        password: String!
        email: String!
        photos: [Photo]
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
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }

`

module.exports = typeDefs;