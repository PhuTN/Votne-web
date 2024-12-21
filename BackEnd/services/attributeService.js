const Attribute = require("../models/Attribute");

/**
 * Tạo một Attribute mới
 * @param {Object} data - Dữ liệu của Attribute
 * @returns {Object} - Attribute vừa tạo
 */
const createAttribute = async (data) => {
  const { id, name, type, values = [], active = true } = data; // Mặc định values là mảng rỗng và active là true
  const newAttribute = new Attribute({ id, name, type, values, active });
  return await newAttribute.save();
};

/**
 * Lấy tất cả Attributes
 * @returns {Array} - Danh sách Attributes
 */
const getAllAttributes = async () => {
  return await Attribute.find().populate('values'); // Populate values để lấy thông tin đầy đủ của AttributeValue
};

/**
 * Lấy chi tiết Attribute theo ID
 * @param {String} id - ID của Attribute
 * @returns {Object|null} - Attribute hoặc null nếu không tìm thấy
 */
const getAttributeById = async (id) => {
  return await Attribute.findById(id).populate('values'); // Populate values để lấy thông tin đầy đủ của AttributeValue
};

/**
 * Cập nhật Attribute theo ID
 * @param {String} id - ID của Attribute
 * @param {Object} data - Dữ liệu cần cập nhật
 * @returns {Object|null} - Attribute sau khi cập nhật hoặc null nếu không tìm thấy
 */
const updateAttributeById = async (id, data) => {
  return await Attribute.findByIdAndUpdate(id, data, { new: true }).populate('values');
};

/**
 * Xóa một Attribute theo ID
 * @param {String} id - ID của Attribute
 * @returns {Boolean} - True nếu xóa thành công, lỗi nếu không
 */
const deleteAttributeById = async (id) => {
  const deletedAttribute = await Attribute.findByIdAndDelete(id);
  if (!deletedAttribute) {
    throw new Error("Attribute not found");
  }
  return true;
};

/**
 * Lấy các Attribute theo type
 * @param {String} type - Loại của Attribute
 * @returns {Array} - Danh sách các Attribute có type tương ứng
 */
const getAttributesByType = async (type) => {
  return await Attribute.find({ type }).populate('values'); // Populate values để lấy thông tin đầy đủ của AttributeValue
};
async function getAttributesByName(name) {
  return Attribute.find({ name }).populate('values'); // Truy vấn MongoDB tìm theo tên
}

module.exports = {
  createAttribute,
  getAllAttributes,
  getAttributeById,
  updateAttributeById,
  deleteAttributeById,
  getAttributesByType,
  getAttributesByName
};
