const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Mã định danh cho review
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Tham chiếu đến User
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Tham chiếu đến Product
  comment: { type: String}, // Nội dung đánh giá
  star: { type: Number, required: true, min: 1, max: 5 }, // Số sao (1-5)
  date: { type: Date, default: Date.now }, // Ngày đánh giá
});

module.exports = mongoose.model("Review", reviewSchema);