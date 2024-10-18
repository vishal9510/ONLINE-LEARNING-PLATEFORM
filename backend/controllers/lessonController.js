const Lesson = require('../model/lesson.model');

// Create a lesson for a course (Admin only)
const createLesson = async (req, res) => {
  try {
    const { title, content, course, order } = req.body;
    const newLesson = new Lesson({ title, content, course, order });
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get all lessons for a course
const getLessonsForCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId }).sort('order');
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    createLesson,
    getLessonsForCourse,
}
