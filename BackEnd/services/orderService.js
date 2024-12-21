const Order = require("../models/Order");

/**
 * Tạo một Order mới
 * @param {Object} data - Dữ liệu của Order
 * @returns {Object} - Order vừa tạo
 */
const createOrder = async (data) => {
  const newOrder = new Order(data);
  return await newOrder.save();
};

/**
 * Lấy danh sách Order của người dùng theo ID
 * @param {String} userId - ID của người dùng
 * @returns {Array} - Danh sách Order của người dùng
 */
const getOrdersByUserId = async (userId) => {
 
  return await Order.find({iduser: userId }).populate("products.idproduct").populate("products.idattributevalue");
};

async function getOrderById(orderId) {
    // Thay thế bằng truy vấn cơ sở dữ liệu hoặc logic xử lý tương ứng
    return Order.findById(orderId).populate("products.idproduct").populate("products.idattributevalue"); // Giả sử bạn sử dụng Mongoose
  }


  async function getAllOrders() {
    // Implement logic to fetch all orders from the database
    return Order.find().populate("products.idproduct").populate("products.idattributevalue"); // Giả sử bạn sử dụng Mongoose;
  }
  
  async function updateMultipleOrders(orders) {
    // Implement logic to update multiple orders


    const updatedOrders = [];
    for (const order of orders) {
      const updatedOrder = await Order.findByIdAndUpdate(order._id, order, { new: true });
      if (updatedOrder) updatedOrders.push(updatedOrder);
    }

    
    return updatedOrders;
  }
  
module.exports = {
  createOrder,
  getOrdersByUserId,
  getOrderById,
  getAllOrders,
  updateMultipleOrders,
};
