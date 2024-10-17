const express = require('express');
const {  createhabit,  updatehabit, gethabit, deletehabit, getadmin } = require('../controllers/habitController');
const { protect , admin } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/create', protect,  createhabit);
router.put('/update/:id', protect,  updatehabit);
router.get('/gethabit', protect,  gethabit);
router.get('/delete/:id', protect,  deletehabit);
router.get('/users', protect, admin, getadmin);


module.exports = router;
