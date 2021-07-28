const {Photo} = require('../models')
const {createWriteStream} = require('fs');
const path = require('path');
const { GraphQLUpload } = require('graphql-upload');
const connection = require('../config/connection')
const mongoose = require('mongoose');

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
            const photoObj = await photo;
            const photoNode = new Photo({
                photoName: photoObj.filename, 
                mimetype: photoObj.mimetype,
                encoding: photoObj.encoding
            });
            photoNode.save();
            console.log(photoNode);
            const{createReadStream} = photoObj;
            console.log('here 1')
            const bucket = new mongoose.mongo.GridFSBucket(connection.db, {bucketName: 'photo'});
            console.log('here 2');
            const uploadStream = bucket.openUploadStream(photoNode._id.toString());
            await new Promise(res => {
                const readStream = createReadStream();
                readStream
                    .pipe(uploadStream)
                    .on("close", res)
            })
            return true;
        }
    }
}

module.exports = resolvers