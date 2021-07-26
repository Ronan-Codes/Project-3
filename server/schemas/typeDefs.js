const {gql} = require('apollo-server-express');
const typeDefs = gql `
    type Photo {
        _id: ID
        photo: String
        postedAt: String
    }
    type Query {
       photos: [Photo] 
    }
    type Mutation {
        addPhoto(photo: String, postedAt: String): Photo
    }
`

module.exports = typeDefs;