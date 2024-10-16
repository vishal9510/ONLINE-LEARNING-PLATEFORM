const Order = require('../model/order.model');
const Product = require('../model/product.model');

// Create a new order with multiple products
const createOrder = async (req, res) => {
  const { products } = req.body; // Array of products with productId and quantity
  try {
    let totalAmount = 0;
    const lowStockProducts = [];
    const updatedProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for product: ${product ? product.name : 'Unknown'}` });
      }

      // Calculate the total amount and update the stock
      totalAmount += product.price * item.quantity;
      product.stock -= item.quantity;

      // Add to low-stock alerts if stock falls below threshold
      if (product.stock < product.lowStockThreshold) {
        lowStockProducts.push(product.name);
      }

      await product.save();
      updatedProducts.push({
        productId: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Create the order
    const order = new Order({
      userId: req.user.userId, // assuming userId comes from the authentication middleware
      products: products.map(p => ({ productId: p.productId, quantity: p.quantity })),
      totalAmount
    });

    await order.save();

    let message = 'Order placed successfully';
    if (lowStockProducts.length > 0) {
      message += `. Low stock alert for: ${lowStockProducts.join(', ')}`;
    }

    res.status(201).json({
      message,
      orderSummary: {
        orderId: order._id,
        totalAmount,
        products: updatedProducts
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List all orders (Admin only)
const listOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').populate('products.productId', 'name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List a customer's own orders (Customer only)
const listUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).populate('products.productId', 'name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
  listOrders,
  listUserOrders,
};
