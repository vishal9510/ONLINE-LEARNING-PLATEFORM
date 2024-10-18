const express = require('express');
const {getAllCourses, createCourse, updateCourse, deleteCourse} = require('../controllers/courseController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllCourses);
router.post('/', protect, admin, createCourse);  // Admin protected route
router.put('/:id', protect, admin, updateCourse);  // Admin protected route
router.delete('/:id', protect, admin, deleteCourse);  // Admin protected route

module.exports = router;