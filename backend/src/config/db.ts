import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://palavdesai5142:Palav@1234@cluster0.m5hymqu.mongodb.net/MediCure');
        console.log('MongoDB connected...');
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error('Unexpected error', err);
        }
        process.exit(1);
    }
};

export default connectDB;
