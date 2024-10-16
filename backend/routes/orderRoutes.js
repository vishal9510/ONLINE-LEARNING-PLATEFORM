const express = require('express');
const { createOrder, updateOrderStatus, listOrders, listUserOrders } = require('../controllers/orderController');
const { protect, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Customers can place orders
router.post('/create', protect, roleMiddleware('customer'), createOrder);

// Admins can update order status
router.put('/update/:id', protect, roleMiddleware('admin'), updateOrderStatus);

// Admins can view all orders
router.get('/list', protect, roleMiddleware('admin'), listOrders);

// Customers can view only their own orders
router.get('/user-orders', protect, roleMiddleware('customer'), listUserOrders);

module.exports = router;
