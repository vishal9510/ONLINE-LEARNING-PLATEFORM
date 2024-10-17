const Habit = require('../model/habit.model');
const User = require('../model/user.model');


// @desc Create a habit
const createhabit = async (req, res) => {
  const { name, description, frequency, specificDays } = req.body;

  // Validate frequency and specific days (if needed)
  if (frequency === 'specific_days' && (!specificDays || specificDays.length === 0)) {
    return res.status(400).json({ msg: 'Please provide specific days for the habit' });
  }

  try {
    const newHabit = new Habit({
      user: req.user.id,
      name,
      description,
      frequency,
      specificDays: frequency === 'specific_days' ? specificDays : [],
    });

    const habit = await newHabit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).send('Server error');
  }

};

// @desc update a habit
const updatehabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, { new: true });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get all habits for user
const gethabit = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// @desc Delete a habit
const deletehabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ msg: 'Habit not found' });

    if (habit.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    await habit.remove();
    res.json({ msg: 'Habit removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const getadmin = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find();

    // Fetch all habits for each user
    const userStats = await Promise.all(
      users.map(async (user) => {
        const habits = await Habit.find({ user: user._id });
        
        // Collect habit statistics for each user
        const habitStats = habits.map((habit) => {
          const totalTracked = habit.dailyProgress.length;
          const completed = habit.dailyProgress.filter((progress) => progress.completed).length;
          const completionRate = totalTracked > 0 ? (completed / totalTracked) * 100 : 0;
          
          return {
            habitName: habit.name,
            streak: habit.streak,
            completionRate: completionRate.toFixed(2), // Percentage of days completed
            frequency: habit.frequency,
            specificDays: habit.specificDays,
          };
        });

        return {
          user: user.name,
          email: user.email,
          habits: habitStats,
        };
      })
    );

    res.json(userStats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createhabit,
  updatehabit,
  gethabit,
  deletehabit,
  getadmin,
};
