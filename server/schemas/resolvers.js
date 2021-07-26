const {Photo} = require('../models')
const {GraphQLUpload} = require('graphql-upload');

const resolvers = {
    Query: {
        photos: async () => {
            return Photo.find()
                .select('-__v')
        }
    },
    Mutation: {
        addPhoto: async (parent, {photo}) => {
            // const {createReadStream, photoName, mimetype, encoding} = await photo;
            // const stream
        }
    }
}

module.exports = resolvers