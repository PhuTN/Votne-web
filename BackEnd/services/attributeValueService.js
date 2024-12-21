const AttributeValue = require("../models/AttributeValue");

/**
 * Tạo một AttributeValue mới
 * @param {Object} data - Dữ liệu của AttributeValue
 * @returns {Object} - AttributeValue vừa tạo
 */
const createAttributeValue = async (data) => {
  const { id, value, active = true } = data; // Mặc định active là true nếu không được cung cấp
  const newAttributeValue = new AttributeValue({ id, value, active });
  return await newAttributeValue.save();
};

/**
 * Lấy tất cả AttributeValues
 * @returns {Array} - Danh sách AttributeValues
 */
const getAllAttributeValues = async () => {
  return await AttributeValue.find();
};

/**
 * Lấy chi tiết AttributeValue theo ID
 * @param {String} id - ID của AttributeValue
 * @returns {Object|null} - AttributeValue hoặc null nếu không tìm thấy
 */
const getAttributeValueById = async (id) => {
  return await AttributeValue.findById(id);
};

/**
 * Cập nhật AttributeValue theo ID
 * @param {String} id - ID của AttributeValue
 * @param {Object} data - Dữ liệu cần cập nhật
 * @returns {Object|null} - AttributeValue sau khi cập nhật hoặc null nếu không tìm thấy
 */
const updateAttributeValueById = async (id, data) => {
  return await AttributeValue.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Xóa một AttributeValue theo ID
 * @param {String} id - ID của AttributeValue
 * @returns {Boolean} - True nếu xóa thành công, lỗi nếu không
 */
const deleteAttributeValueById = async (id) => {
  const deletedAttributeValue = await AttributeValue.findByIdAndDelete(id);
  if (!deletedAttributeValue) {
    throw new Error("AttributeValue not found");
  }
  return true;
};

module.exports = {
  createAttributeValue,
  getAllAttributeValues,
  getAttributeValueById,
  updateAttributeValueById,
  deleteAttributeValueById,
};
