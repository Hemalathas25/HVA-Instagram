import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { 
        type: String, 
        required: true,
        unique: true
    },

    password: { 
        type: String,
        required: true
    },

    emailOrUsername: { 
        type: String, 
        required: true 
    }, 

    name: { 
        type: String, 
        required: true 
    },

    gender: {
        type: String,
        required: true
    },

    dateOfBirth: {
         type: Date, 
         required: true 
        },

    userName: {
         type: String, 
         required: true,
        unique: true
    },
   
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    }, // Reference to the User model
   
    photo: {
         type: String 
        }, // You can store the URL of the photo

    bio: { 
        type: String 
    },

    website: {
         type: String 
        }
}, {
    timestamps: true,
})

const User = mongoose.model('User', UserSchema);

export default { User }