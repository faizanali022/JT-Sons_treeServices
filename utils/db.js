const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('⏳ Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            console.error('👉 Make sure MongoDB server is running on localhost:27017');
        }
        process.exit(1);
    }
};

module.exports = connectDB;