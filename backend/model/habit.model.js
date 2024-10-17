const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: { type: String },
  frequency: { type: String, required: true,  enum: ['daily', 'weekly', 'specific_days'] }, // daily, weekly, etc.
  specificDays: [String], // Only used when frequency is 'specific_days' (e.g., ['Monday', 'Wednesday'])
  streak: { type: Number, default: 0 }, // Tracks consecutive days
  lastTracked: { type: Date }, // Last date the habit was tracked
  dailyProgress: [
    {
      date: { type: Date, required: true },
      completed: { type: Boolean, required: true },
    },
  ],
  startDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Habit', HabitSchema);
