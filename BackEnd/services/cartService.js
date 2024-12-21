const Cart = require("../models/Cart");
const User = require("../models/User");

/**
 * Tạo một Cart mới
 * @param {Object} data - Dữ liệu của Cart
 * @returns {Object} - Cart vừa tạo
 */
const createCart = async (data) => {
  const { iduser, products } = data;
  const newCart = new Cart({ iduser, products });
  return await newCart.save();
};

/**
 * Lấy Cart của người dùng theo ID
 * @param {String} userId - ID của người dùng
 * @returns {Object|null} - Cart của người dùng hoặc null nếu không tìm thấy
 */
const getCartByUserId = async (userId) => {
  

    return await Cart.findOne({
        $expr: { $eq: [{ $toString: "$iduser" }, userId] }
    }).populate("products.idproduct").populate("products.idattributevalue");
};




/**
 * Cập nhật Cart theo ID
 * @param {String} id - ID của Cart
 * @param {Object} data - Dữ liệu cần cập nhật
 * @returns {Object|null} - Cart sau khi cập nhật hoặc null nếu không tìm thấy
 */
const updateCartById = async (id, data) => {
  return await Cart.findByIdAndUpdate(id, data, { new: true }).populate("products.idproduct").populate("products.idattributevalue");
};

/**
 * Xóa Cart theo ID
 * @param {String} id - ID của Cart
 * @returns {Boolean} - True nếu xóa thành công, lỗi nếu không
 */
const deleteCartById = async (id) => {
  const deletedCart = await Cart.findByIdAndDelete(id);
  if (!deletedCart) {
    throw new Error("Cart not found");
  }
  return true;
};

module.exports = {
  createCart,
  getCartByUserId,
  updateCartById,
  deleteCartById,
};
