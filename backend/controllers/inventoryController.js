const Product = require('../model/product.model');

// Create a new product (Admin only)
const addProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  try {
    const product = new Product({ name, description, price, stock, category });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View a specific product by ID (Admin/Customer)
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View all products (Admin/Customer)
const listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ID (Admin only)
const updateProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, category },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product by ID (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update stock level for a product (Admin only)
const updateStockLevel = async (req, res) => {
  const { stock } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.stock = stock;
    await product.save();
    res.json({ message: 'Stock level updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products with low stock levels (Admin only)
const getLowStockAlerts = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ stock: { $lt: '$lowStockThreshold' } });
    res.json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  addProduct,
  getProduct,
  listProducts,
  updateProduct,
  deleteProduct,
  updateStockLevel,
  getLowStockAlerts,
};
