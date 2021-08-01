const { Photo, User } = require('../models')
const { createWriteStream } = require('fs');
const path = require('path');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { GraphQLUpload } = require('graphql-upload');
const connection = require('../config/connection')
const mongoose = require('mongoose');

const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        photos: async () => {
            return Photo.find()
                .select('-__v')
        },
        userPhotos: async (parent, {userId}) => {
            return User.findOne({_id:  userId})
                .select('-__v')
                .populate('photos')
        },
        users: async () =>{
            return User.find()
                .select('-__v -password')
                .populate('photos')
        }
    },
    Mutation: {
        addPhoto: async (_, { photo, userId }) => {
            const photoObj = await photo;
            console.log(userId)
            const photoNode = new Photo({
                photoName: photoObj.filename,
                mimetype: photoObj.mimetype,
                encoding: photoObj.encoding
            });
            photoNode.save();
            console.log(photoNode);
            const { createReadStream } = photoObj;
            console.log('here 1')
            const bucket = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'photo' });
            console.log('here 2');
            const uploadStream = bucket.openUploadStream(photoNode._id.toString());
            await new Promise(res => {
                const readStream = createReadStream();
                readStream
                    .pipe(uploadStream)
                    .on("close", res)
            })
            await User.findByIdAndUpdate(
                { _id: userId },
                { $push: { photos: photoNode._id.toString() } },
                { new: true }
              );
            return true;
        },
        addProfilePhoto: async (_, { photo, userId }) => {
            const photoObj = await photo;
            console.log(userId)
            const photoNode = new Photo({
                photoName: photoObj.filename,
                mimetype: photoObj.mimetype,
                encoding: photoObj.encoding
            });
            photoNode.save();
            console.log(photoNode);
            const { createReadStream } = photoObj;
            console.log('here 1')
            const bucket = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'photo' });
            console.log('here 2');
            const uploadStream = bucket.openUploadStream(photoNode._id.toString());
            await new Promise(res => {
                const readStream = createReadStream();
                readStream
                    .pipe(uploadStream)
                    .on("close", res)
            })
            await User.findByIdAndUpdate(
                { _id: userId },
                { $set: { profilePhoto: photoNode._id.toString() } },
                { new: true }
              );
            return true;
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            console.log(token);
            return { token, user };
        }
    }
    }

module.exports = resolvers