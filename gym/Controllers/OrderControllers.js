const Order = require("../Model/OrderModel");
const Store = require("../Model/StoreModel");

// Create a new order
const createOrder = async (req, res) => {
  const { member, items } = req.body;

  try {
    let totalAmount = 0;

    // calculate subtotal for each item
    const processedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Store.findById(item.product);
        if (!product) throw new Error("Product not found");

        const subtotal = product.price * item.quantity;
        totalAmount += subtotal;

        return {
          product: product._id,
          quantity: item.quantity,
          price: product.price,
          subtotal: subtotal,
        };
      })
    );

    const order = new Order({
      member,
      items: processedItems,
      total_amount: totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("member", "username email")
      .populate("items.product", "name price");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("member", "username email")
      .populate("items.product", "name price");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
