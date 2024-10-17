const express = require('express');
const {  trackhabit,  gettracking, } = require('../controllers/trackController');
const { protect  } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect,  trackhabit);
router.get('/:habitId', protect, gettracking);

module.exports = router;
