import asyncHandler from "../middleware/asyncHandler";
import Order from "../models/orderModel";
import Stripe from "stripe";

// Initialize Stripe only if the secret key is provided
const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
  }
  return new Stripe(secretKey, {
    apiVersion: "2025-11-17.clover",
  });
};

// @desc Create a new order
// route: POST /api/orders
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user?._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
  res.send("addOrderItems");
});

// @desc Get logged in users orders
// route: GET /api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user?._id });
  res.status(200).json(orders);
});

// @desc Get order by id
// route: GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Create Stripe payment intent
// route: POST /api/orders/:id/create-payment-intent
// @access Private
export const createPaymentIntent = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Verify order belongs to user
  if (order.user.toString() !== req.user?._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // Create payment intent
  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.totalPrice * 100), // Convert to cents
    currency: "usd",
    metadata: {
      orderId: order._id.toString(),
    },
  });

  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  });
});

// @desc Update order to paid
// route: PUT /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();

    // Handle Stripe payment
    if (req.body.paymentIntentId) {
      order.paymentResult = {
        id: req.body.paymentIntentId,
        status: req.body.status || "succeeded",
        update_time: new Date().toISOString(),
        email_address: req.body.email_address || req.user?.email,
      };
    } else {
      // Handle PayPal or other payment methods
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
    }

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to delivered
// route: PUT /api/orders/:id/deliver
// @access Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("updateOrderToDelivered");
});

// @desc Get all orders
// route: GET /api/orders
// @access Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  res.send("getOrders");
});
