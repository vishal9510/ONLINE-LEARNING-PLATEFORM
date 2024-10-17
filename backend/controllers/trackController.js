const Track = require('../model/track.model');
const Habit = require('../model/habit.model');
const moment = require('moment');


// @desc Track habit completion
const trackhabit = async (req, res) => {
  const { habitId, date, status } = req.body; // 'date' represents the day user is tracking, 'status' is true or false
  const trackingDate = moment(date).startOf('day').toDate(); // Normalize the date to avoid time differences

  try {
    const habit = await Habit.findById(habitId);
    if (!habit || habit.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Habit not found or unauthorized' });
    }

    // Check if the user is tracking the habit for today or a past date
    const lastTracked = habit.lastTracked ? moment(habit.lastTracked).startOf('day') : null;
    const currentDate = moment().startOf('day');

    // Update streak based on the last tracked date
    if (status) {
      if (lastTracked) {
        const diffInDays = currentDate.diff(lastTracked, 'days');
        if (diffInDays === 1) {
          // Increment streak if tracked consecutively
          habit.streak += 1;
        } else if (diffInDays > 1) {
          // Reset streak if days were skipped
          habit.streak = 1;
        }
      } else {
        // Start a new streak
        habit.streak = 1;
      }
    } else {
      // Reset streak if user marks habit as incomplete
      habit.streak = 0;
    }

    // Update lastTracked date
    habit.lastTracked = trackingDate;

    // Add the daily progress
    const dailyProgress = { date: trackingDate, completed: status };
    habit.dailyProgress.push(dailyProgress);

    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// @desc Get tracking data for a habit
const gettracking = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.habitId).populate('user');
    if (!habit || habit.user.id !== req.user.id) {
      return res.status(404).json({ msg: 'Habit not found' });
    }
    res.json({
      habit: habit.name,
      streak: habit.streak,
      progress: habit.dailyProgress,
      frequency: habit.frequency,
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
};




module.exports = {

  trackhabit,
  gettracking,
};
