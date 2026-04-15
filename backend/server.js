require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const seedDefaultQuiz = require('./utils/seedDefaultQuiz');

// Routes
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// ✅ Error handling
app.use((err, req, res, next) => {
  console.error("ERROR 💥:", err.message);
  res.status(500).json({ message: err.message });
});

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined."); return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Failed ❌:", error.message);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;

// Only listen locally, NEVER on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, async () => {
    await seedDefaultQuiz();
    console.log(`Server running locally on port ${PORT} 🚀`);
  });
}

module.exports = app;
