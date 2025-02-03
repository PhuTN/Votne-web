const express = require("express");
const Review = require("../models/Review"); // Giả sử bạn đã có model Review
const authMiddleware = require("../middlewares/authMiddleware");
const Order = require("../models/Order");
const router = express.Router();

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Add a new review
 *     description: Endpoint để người dùng đăng một review.
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               userId:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi máy chủ
 */
router.post("/",  async (req, res) => {
    const { productId, userId, star, comment, orderId } = req.body;
  
    try {
      if (!productId || !userId || !star || !orderId) {
        return res.status(400).json({ message: "Thiếu thông tin cần thiết." });
      }
  
      // Tạo review mới
      function generateRandomId() {
        return Math.random().toString(36).substr(2, 9); // Tạo chuỗi ngẫu nhiên, bỏ "0." và lấy 9 ký tự
      }
    const newReview = new Review({ id:generateRandomId(),productId, userId, star, comment });
      await newReview.save();
  
      // Tìm đơn hàng và cập nhật review cho sản phẩm tương ứng
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId, "products.idproduct": productId },
        { $set: { "products.$.review": newReview._id } },
        { new: true } // Trả về document đã cập nhật
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng hoặc sản phẩm trong đơn hàng." });
      }
  
      res.status(201).json({ 
        message: "Review đã được thêm thành công và gắn vào sản phẩm trong đơn hàng.", 
        review: newReview,
        updatedOrder
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi thêm review." });
    }
  });
  

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     description: Lấy danh sách tất cả các review.
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Thành công
 *       500:
 *         description: Lỗi máy chủ
 */
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách review." });
  }
});

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     description: Lấy thông tin chi tiết của một review.
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của review
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Review không tồn tại
 *       500:
 *         description: Lỗi máy chủ
 */
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review không tồn tại." });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin review." });
  }
});

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     description: Endpoint để cập nhật thông tin một review.
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của review
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Review không tồn tại
 *       500:
 *         description: Lỗi máy chủ
 */
router.put("/:id", authMiddleware, async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review không tồn tại." });
    }

    res.status(200).json({ message: "Review đã được cập nhật.", review: updatedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi cập nhật review." });
  }
});

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     description: Xóa một review theo ID.
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của review
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Review không tồn tại
 *       500:
 *         description: Lỗi máy chủ
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review không tồn tại." });
    }

    res.status(200).json({ message: "Review đã được xóa thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi xóa review." });
  }
});


router.get("/product/:productId", async (req, res) => {
    try {
      const reviews = await Review.find({ productId: req.params.productId }).populate("userId");
  
      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy review nào cho sản phẩm này." });
      }
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi lấy danh sách review." });
    }
  });

module.exports = router;
