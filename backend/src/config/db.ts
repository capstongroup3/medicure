import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://palavdesai5142:Palav@1234@cluster0.m5hymqu.mongodb.net/MediCure?tls=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: false, // This is generally set to false for production use to ensure the security of the SSL/TLS connection.
});

        console.log('MongoDB connected...');
    } catch (err) {
        if (err instanceof Error) {
            console.error('MongoDB connection error:', err.message);
        } else {
            console.error('Unexpected error:', err);
        }
        process.exit(1);
    }
};

export default connectDB;
