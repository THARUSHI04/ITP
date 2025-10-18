const Order = require("../Model/OrderModel");
const Store = require("../Model/StoreModel");
const User = require("../Model/UserModel");
const { sendOrderConfirmationEmail } = require("../utils/emailService");
const mongoose = require("mongoose");

function isValidObjectId(id) {
  return typeof id === "string" && mongoose.Types.ObjectId.isValid(id);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonNegativeInteger(value) {
  const n = Number(value);
  return Number.isInteger(n) && n >= 0;
}

function isPositiveInteger(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

function sanitizeString(value) {
  return typeof value === "string" ? value.trim() : value;
}

// payment method normalization removed per request

function validateCreateOrderPayload(payload) {
  const errors = [];
  const {
    order_number: clientOrderNumber,
    member,
    items,
    shipping_address,
    contact_phone,
    payment_method,
    // bank_slip is file, validated separately if present
  } = payload || {};

  if (!isValidObjectId(member)) errors.push("member must be a valid ObjectId");

  if (!Array.isArray(items) || items.length === 0) {
    errors.push("items must be a non-empty array");
  } else {
    items.forEach((item, index) => {
      if (!item || typeof item !== "object") {
        errors.push(`items[${index}] must be an object`);
        return;
      }
      if (!isValidObjectId(item.product)) {
        errors.push(`items[${index}].product must be a valid ObjectId`);
      }
      if (!isPositiveInteger(item.quantity)) {
        errors.push(`items[${index}].quantity must be a positive integer`);
      }
    });
  }

  if (!isNonEmptyString(shipping_address)) {
    errors.push("shipping_address must be a non-empty string");
  }

  if (!isNonEmptyString(contact_phone)) {
    errors.push("contact_phone must be a non-empty string");
  } else if (!/^\d{1,14}$/.test(contact_phone.trim())) {
    errors.push("contact_phone must contain only digits and be at most 14 digits");
  }

  // no validation for payment_method per request

  if (clientOrderNumber !== undefined && !isNonEmptyString(clientOrderNumber)) {
    errors.push("order_number, if provided, must be a non-empty string");
  }

  return errors;
}

//create a new order
const createOrder = async (req, res) => {
  const {
    order_number: clientOrderNumber,
    member,
    items: rawItems,
    shipping_address,
    contact_phone,
    payment_method,
  } = req.body || {};

  // Support multipart/form-data where items may arrive as a JSON string
  let items = rawItems;
  if (typeof rawItems === "string") {
    try {
      items = JSON.parse(rawItems);
    } catch (e) {
      return res.status(400).json({ message: "items must be valid JSON when sent as string" });
    }
  }

  let errors = validateCreateOrderPayload({
    order_number: clientOrderNumber,
    member,
    items,
    shipping_address,
    contact_phone,
    payment_method,
  });
  // Force-ignore any legacy payment_method validation messages if present anywhere upstream
  errors = errors.filter((msg) => !String(msg || "").toLowerCase().includes("payment_method"));
  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  try {
    let totalAmount = 0;

    //calculate subtotal for each item
    const processedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Store.findById(item.product);
        if (!product) throw new Error("Product not found");

        const subtotal = product.price * item.quantity;
        totalAmount += subtotal;

        return {
          product: product._id,
          quantity: Number(item.quantity),
          price: product.price,
          subtotal: subtotal,
        };
      })
    );

    const order = new Order({
      order_number: clientOrderNumber || `ORD-${Date.now()}`,
      member,
      items: processedItems,
      total_amount: totalAmount,
      shipping_address: sanitizeString(shipping_address),
      contact_phone: sanitizeString(contact_phone),
      payment_method,
      bank_slip: req.file ? req.file.path : undefined,
    });

    await order.save();

    // Populate order details for email
    const populatedOrder = await Order.findById(order._id)
      .populate("member", "userName email")
      .populate("items.product", "name price");

    // Send order confirmation email
    try {
      await sendOrderConfirmationEmail(
        populatedOrder.member.email,
        populatedOrder.member.userName,
        populatedOrder
      );
      console.log("Order confirmation email sent successfully to:", populatedOrder.member.email);
    } catch (emailError) {
      console.error("Failed to send order confirmation email:", emailError);
      // Don't fail the order creation if email fails
    }

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

//Get all orders
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

//Get orders by user ID
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const orders = await Order.find({ member: userId })
      .populate("member", "userName email")
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 }); // Most recent first
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }
    const order = await Order.findById(id)
      .populate("member", "username email")
      .populate("items.product", "name price");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }
    const allowedStatuses = ["pending", "paid", "shipped", "cancelled", "completed"];
    if (!isNonEmptyString(status) || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: `status must be one of: ${allowedStatuses.join(", ")}` });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Delete order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Pay order and send confirmation email
const payOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!isValidObjectId(orderId)) {
      return res.status(400).json({ message: "Invalid order id" });
    }
    
    //Find the order and populate user details
    const order = await Order.findById(orderId)
      .populate("member", "userName email")
      .populate("items.product", "name price");
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Do not auto-mark bank deposit orders as paid via this endpoint
    if (order.payment_method === "Bank Deposit") {
      return res.status(400).json({ message: "Bank deposit orders require admin approval" });
    }
    
  
    order.status = "paid";
    await order.save();

    //Send confirmation email
    try {
      await sendOrderConfirmationEmail(
        order.member.email,
        order.member.userName,
        order
      );
      console.log("Order confirmation email sent successfully");
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      
    }

    res.status(200).json({ 
      message: "Order paid successfully", 
      order: order,
      emailSent: true
    });
  } catch (err) {
    console.error("Error processing payment:", err);
    res.status(500).json({ error: err.message });
  }
};

const createCheckoutSession = async (req, res) => {
  try {
    return res.status(501).json({ message: "createCheckoutSession not implemented" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Admin approval for bank deposit orders
const approveBankDeposit = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }
    const order = await Order.findById(id)
      .populate("member", "userName email")
      .populate("items.product", "name price");
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.payment_method !== "Bank Deposit") {
      return res.status(400).json({ message: "Only bank deposit orders can be approved here" });
    }
    if (!order.bank_slip) {
      return res.status(400).json({ message: "Bank slip is required to approve deposit" });
    }

    order.status = "paid";
    await order.save();

    // Send confirmation email after approval
    try {
      await sendOrderConfirmationEmail(
        order.member.email,
        order.member.userName,
        order
      );
      console.log("Order confirmation email sent after bank deposit approval to:", order.member.email);
    } catch (emailError) {
      console.error("Failed to send confirmation email after approval:", emailError);
      // Don't fail the approval if email fails
    }

    return res.status(200).json({ message: "Bank deposit approved", order });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update payment status and card details for card payments
const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_status, card_details } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Update payment status
    if (payment_status) {
      const validStatuses = ["pending", "success", "failed"];
      if (!validStatuses.includes(payment_status)) {
        return res.status(400).json({ message: "Invalid payment status" });
      }
      order.payment_status = payment_status;
    }

    // Update card details if provided
    if (card_details) {
      order.card_details = {
        card_last4: card_details.card_last4,
        card_brand: card_details.card_brand,
        payment_intent_id: card_details.payment_intent_id,
      };
    }

    await order.save();
    return res.status(200).json({ message: "Payment status updated", order });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  payOrder,
  createCheckoutSession,
  approveBankDeposit,
  updatePaymentStatus,
};
