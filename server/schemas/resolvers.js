const {Photo} = require('../models')
const {createWriteStream} = require('fs');
const path = require('path');
const { GraphQLUpload } = require('graphql-upload');

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        photos: async () => {
            return Photo.find()
                .select('-__v')
        }
    },
    Mutation: {
        addPhoto: async (_, {photo}) => {
            const{createReadStream, filename} = await photo;
            console.log(photo, filename)
            await new Promise(res => {
                const readStream = createReadStream();
                readStream
                    .pipe(createWriteStream(path.join(__dirname,'../images', filename)))
                    .on("close", res)
            })
            return true;
        }
    }
}

module.exports = resolvers