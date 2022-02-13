const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //must match valid email
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{1,7})$/,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User = model = model('user', userSchema);

module.exports = User;