const express = require("express");
const { body, validationResult } = require("express-validator");
const cartService = require("../services/cartService");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get cart by user ID
 *     description: Returns the cart for the user with the specified ID.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 iduser:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idproduct:
 *                         type: string
 *                       colorid:
 *                         type: string
 *                       idattributevalue:
 *                         type: string
 *                       price:
 *                         type: number
 *                       number:
 *                         type: number
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.get("/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;
  try {
    
    const cart = await cartService.getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found for this user" });
    }
  
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err)
  }
});

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Create a new cart
 *     description: Create a new cart for a user.
 *     responses:
 *       201:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post(
  "/", authMiddleware,
  [
    body("iduser").notEmpty().withMessage("User ID is required"),
    body("products").isArray().withMessage("Products must be an array"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newCart = await cartService.createCart(req.body);
      res.status(201).json({
        message: "Cart created successfully",
        data: newCart,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Update an existing cart
 *     description: Update the cart with the specified ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the cart to update
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
   
    console.log("hello")
    const updatedCart = await cartService.updateCartById(req.params.id, req.body);
    if (!updatedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err)
  }
});

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Delete a cart
 *     description: Delete the cart with the specified ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the cart to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedCart = await cartService.deleteCartById(req.params.id);
    if (!deletedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
