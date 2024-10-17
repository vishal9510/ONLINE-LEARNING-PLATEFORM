const cron = require('node-cron');
const Habit = require('../model/habit.model');
const { sendReminderEmail } = require('../services/emailService');
const moment = require('moment');

// Schedule the cron job to run every day at 8:00 AM
cron.schedule('0 8 * * *', async () => {
    console.log('Running the daily habit notification job...');

    try {
        // Get all habits that need to be checked for today
        const habits = await Habit.find();

        habits.forEach(habit => {
            // Check if the habit needs to be completed today based on its frequency
            const today = moment().format('10/18'); // Get today's day of the week (e.g., 'Monday')

            if (habit.frequency === 'daily' || (habit.frequency === 'specific_days' && habit.specificDays.includes(today))) {
                // Check if the habit was completed today
                const todayProgress = habit.dailyProgress.find(progress => moment(progress.date).isSame(moment(), 'day'));

                if (!todayProgress || !todayProgress.completed) {
                    // Habit not completed today, send reminder email
                    const userEmail = habit.user.email; // Assuming user email is available in habit.user
                    const subject = `Reminder: You have a pending habit: ${habit.name}`;
                    const message = `Hi there! Don't forget to complete your habit: "${habit.name}" today. Keep up the good work!`;

                    sendReminderEmail(userEmail, subject, message);
                }
            }
        });

    } catch (err) {
        console.error('Error in daily habit notification job:', err.message);
    }
});
