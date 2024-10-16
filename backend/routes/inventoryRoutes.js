const express = require('express');
const {
  addProduct,
  getProduct,
  listProducts,
  updateProduct,
  deleteProduct,
  updateStockLevel,
  getLowStockAlerts
} = require('../controllers/inventoryController');
const { protect, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new product (Admin only)
router.post('/add', protect, roleMiddleware('admin'), addProduct);

// Get a single product by ID (Admin/Customer)
router.get('/:id', protect, getProduct);

// List all products (Admin/Customer)
router.get('/', protect, listProducts);

// Update a product by ID (Admin only)
router.put('/update/:id', protect, roleMiddleware('admin'), updateProduct);

// Delete a product by ID (Admin only)
router.delete('/delete/:id', protect, roleMiddleware('admin'), deleteProduct);

// Update stock level for a product (Admin only)
router.put('/update-stock/:id', protect, roleMiddleware('admin'), updateStockLevel);

// Get low-stock products (Admin only)
router.get('/low-stock', protect, roleMiddleware('admin'), getLowStockAlerts);


module.exports = router;
