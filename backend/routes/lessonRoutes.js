const express = require('express');
const lessonController = require('../controllers/lessonController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, admin, lessonController.createLesson); // Admin can create lessons
router.get('/course/:courseId', protect, lessonController.getLessonsForCourse); // Public route to get lessons for a course

module.exports = router;
