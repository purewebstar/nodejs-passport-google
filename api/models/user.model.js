/** importing dependencies */
import mongoose from 'mongoose'


const userAccountSchema = mongoose.Schema({
    userId: String,
    email: String,
    displayName: String,
    givenName: String,
    familyName: String,
    pictureUri: String
},{
    timestamps: true
})

export const userAccount = mongoose.model('users', userAccountSchema)