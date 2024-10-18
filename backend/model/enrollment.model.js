const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  progress: { type: Number, default: 0 }, // percentage
  lessonCompletion: [{
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    completed: { type: Boolean, default: false }
  }],
  enrolled_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
