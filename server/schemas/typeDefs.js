const {gql} = require('apollo-server-express');
const typeDefs = gql `
    # The implementation for this scalar is provided by the
    # 'GraphQLUpload' export from the 'graphql-upload' package
    # in the resolver map below.
    scalar Upload

    type Photo {
        _id: ID
        photoName: String!
        mimetype: String!
        encoding: String!
        #postedAt: String
    }
    type Query {
       photos: [Photo] 
    }
    type Mutation {
        addPhoto(photo: Upload!): Boolean
    }
`

module.exports = typeDefs;