const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  habit: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
  date: { type: Date, required: true },
  status: { type: Boolean, required: true }, // true: completed, false: missed
});

module.exports = mongoose.model('Track', TrackSchema);
