const mongoose = require("mongoose");

// Định nghĩa model Cart
const cartSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // Thêm trường id cho Cart
    iduser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Tham chiếu đến User
    products: [
      {
        idproduct: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Tham chiếu đến Product
        colorid: { type: String, required: true }, // Mã màu sản phẩm
        idattributevalue: { type: mongoose.Schema.Types.ObjectId, ref: "AttributeValue", required: true }, // Tham chiếu đến AttributeValue
        price: { type: Number, required: true }, // Giá sản phẩm
        number: { type: Number, required: true }, // Số lượng sản phẩm
      }
    ],
  },
  { timestamps: true } // Thêm thông tin thời gian tạo và cập nhật
);

// Xuất model Cart
module.exports = mongoose.model("Cart", cartSchema);
