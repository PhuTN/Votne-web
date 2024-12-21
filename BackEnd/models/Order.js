const mongoose = require("mongoose");

// Định nghĩa model Order
const orderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // ID của đơn hàng
    iduser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Tham chiếu đến User
    name: { type: String, required: true }, // Tên người nhận
    phonumber: { type: String, required: true }, // Số điện thoại người nhận
    address: { type: String, required: true }, // Địa chỉ giao hàng
    email: { type: String, required: true }, // Email người nhận
    description: { type: String, default: "" }, // Mô tả đơn hàng

    cancelReason: { type: String, default: "" },
    status: { 
      type: String, 
      enum: ["Chờ xử lý", "Đang xử lý", "Đang giao hàng", "Đã giao", "Đã hủy"], 
      default: "Chờ xử lý" 
    }, // Trạng thái đơn hàng bằng tiếng Việt
    location: { type: String, required: false }, // Vị trí giao hàng (chuỗi địa chỉ)
    dayorder: { type: Date, default: Date.now }, // Ngày đặt hàng
    paymentMethod: { 
      type: String, 
      enum: ["Ship Cod", "Chuyển Khoản"], 
      required: true 
    }, // Phương thức thanh toán
    paymentStatus: { 
      type: String, 
      enum: ["Chưa Thanh Toán", "Đã Thanh Toán", "Đang Chờ Xác Nhận"], 
      default: "Chưa Thanh Toán" 
    }, // Tình trạng thanh toán
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

// Xuất model Order
module.exports = mongoose.model("Order", orderSchema);
