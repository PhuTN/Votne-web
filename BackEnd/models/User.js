const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  address: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"], default: "Other" },
  dateOfBirth: { type: Date },
  role: { type: String, enum: ["Customer", "Admin", "Seller", "WarehouseStaff"], default: "Customer" },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  avatar: { type: String, default: "" }, // Ảnh đại diện
  wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Danh sách sản phẩm yêu thích
});

// So sánh mật khẩu khi đăng nhập
userSchema.methods.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
