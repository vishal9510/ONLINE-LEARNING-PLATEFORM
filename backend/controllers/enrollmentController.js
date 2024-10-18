const Enrollment = require('../model/enrollment.model');
const Lesson = require('../model/lesson.model');

// Enroll a user in a course
const enrollUser = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const enrollment = new Enrollment({ user: userId, course: courseId });
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Track user progress
const updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, { progress }, { new: true });
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all enrollments for a user
const getEnrollmentsByUser = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.params.userId }).populate('course');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark a lesson as completed
const completeLesson = async (req, res) => {
  try {
    const { enrollmentId, lessonId } = req.params;

    // Find enrollment
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    // Find lesson in the course
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    if (lesson.course.toString() !== enrollment.course.toString()) {
      return res.status(400).json({ message: 'Lesson does not belong to the enrolled course' });
    }

    // Update lesson completion
    const lessonIndex = enrollment.lessonCompletion.findIndex((item) => item.lesson.toString() === lessonId);
    if (lessonIndex === -1) {
      enrollment.lessonCompletion.push({ lesson: lessonId, completed: true });
    } else {
      enrollment.lessonCompletion[lessonIndex].completed = true;
    }

    // Recalculate course progress
    const totalLessons = await Lesson.countDocuments({ course: enrollment.course });
    const completedLessons = enrollment.lessonCompletion.filter(item => item.completed).length;
    enrollment.progress = (completedLessons / totalLessons) * 100;

    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get progress and lesson completion status for an enrollment
const getEnrollmentProgress = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.enrollmentId)
      .populate('course')
      .populate('lessonCompletion.lesson');
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  enrollUser,
  updateProgress,
  getEnrollmentsByUser,
  completeLesson,
  getEnrollmentProgress,
};
