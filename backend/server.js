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

// ✅ MongoDB Connection Function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Failed ❌:", error.message);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;

// ✅ Start Server
const startServer = async () => {
  await connectDB();           // 🔥 DB connect
  await seedDefaultQuiz();     // optional seed

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
};

startServer();