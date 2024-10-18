const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', enrollmentController.enrollUser);
router.put('/:id/progress', enrollmentController.updateProgress);
router.get('/user/:userId', enrollmentController.getEnrollmentsByUser);
router.put('/:enrollmentId/lesson/:lessonId/complete', protect, enrollmentController.completeLesson); // Mark lesson as completed
router.get('/:enrollmentId/progress', protect, enrollmentController.getEnrollmentProgress); // Get progress for a specific enrollment
module.exports = router;
