const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Genre = require('./Genre');

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        index: { unique: true } 
    },
    description: {
        type: String
    },
    password: { 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    profilePhoto: { type: Schema.Types.ObjectId, ref: 'Photo' },
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    genres: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        // required: false
      }
},
{
    toJson: {
        virtuals: true,
    },
    id: false
});

userSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// Virtuals are typically used for computed properties on documents.
userSchema.virtual('followersCount').get(function() {
    return this.followers.length;
});

userSchema.virtual('followingCount').get(function() {
    return this.following.length;
});
// Virtuals end

const User = model('User', userSchema);

module.exports = User;