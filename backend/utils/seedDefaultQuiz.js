const { Types } = require('mongoose');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const awtQuiz = require('../quiz_file/awt');

const seedDefaultQuiz = async () => {
  const existingQuiz = await Quiz.findOne({ title: awtQuiz.title });

  if (existingQuiz) {
    console.log(`Default quiz already exists: ${awtQuiz.title}`);
    return existingQuiz;
  }

  let creator = await User.findOne({ role: 'admin' }).select('_id');

  if (!creator) {
    creator = await User.findOne().select('_id');
  }

  const createdBy = creator ? creator._id : new Types.ObjectId();

  const quiz = await Quiz.create({
    title: awtQuiz.title,
    description: awtQuiz.description,
    questions: awtQuiz.questions,
    createdBy
  });

  console.log(`Seeded default quiz: ${quiz.title} (${quiz.questions.length} questions)`);
  return quiz;
};

module.exports = seedDefaultQuiz;
