import { v4 as uuidv4 } from 'uuid';
import { Schema, model } from 'mongoose';
const bcrypt = require('bcryptjs');

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    userType: string
}

const UserSchema: Schema = new Schema({
    _id: {
        type: String,
        default: uuidv4, // Automatically generate UUID when creating a new user
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
});

const User = model<IUser>('User', UserSchema);

export default User;
