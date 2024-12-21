const express = require("express");
const { body, validationResult } = require("express-validator");
const orderService = require("../services/orderService.js");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/orders/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     description: Returns the orders for the user with the specified ID.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: Orders not found
 *       500:
 *         description: Server error
 */
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await orderService.getOrdersByUserId(userId);
    if (!orders.length) {
      return res.status(404).json({ error: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/orders/by-id/{orderId}:
 *   get:
 *     summary: Get order by order ID
 *     description: Returns the order with the specified ID.
 *     parameters:
 *       - name: orderId
 *         in: path
 *         description: ID of the order
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get("/by-id/:orderId", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await orderService.getOrderById(orderId);
   
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order for a user.
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  authMiddleware,
  [
    body("iduser").notEmpty().withMessage("User ID is required"),
    body("products").isArray().withMessage("Products must be an array"),
    body("status").optional().isString().withMessage("Status must be a string"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newOrder = await orderService.createOrder(req.body);
      res.status(201).json({
        message: "Order created successfully",
        data: newOrder,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an existing order
 *     description: Update the order with the specified ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order to update
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await orderService.updateOrderById(id, req.body);
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Returns a list of all orders in the system.
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get("/",  async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/**
 * @swagger
 * /api/orders:
 *   put:
 *     summary: Update multiple orders
 *     description: Updates multiple orders at once.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *     responses:
 *       200:
 *         description: Orders updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/", authMiddleware, async (req, res) => {
  try {
    
    const orders = req.body;
    if (!Array.isArray(orders)) {
      return res.status(400).json({ error: "Input must be an array of orders" });
    }
    const updatedOrders = await orderService.updateMultipleOrders(orders);
    res.status(200).json({
      message: "Orders updated successfully",
      data: updatedOrders,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
