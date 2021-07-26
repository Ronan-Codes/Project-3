const {Photo} = require('../models')

const resolvers = {
    Query: {
        photos: async () => {
            return Photo.find()
                .select('-__v')
        }
    },
    Mutation: {
        addPhoto: async (parent, args) => {
            const photo = await Photo.create(args);
            return photo;
        }
    }
}

module.exports = resolvers