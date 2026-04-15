// In backend/config/db.js
const mongoose = require('mongoose');

const connect = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quiz-app';

  try {
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${process.env.MONGO_URI ? 'env' : 'local default'}`);
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = { connect };
