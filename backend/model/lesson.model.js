const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  order: { type: Number, required: true }, // Order of the lesson in the course
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lesson', lessonSchema);
