const Product = require("../models/Product");

const createProduct = async (data) => {
  const { id, name, description, type, attributeValues = [], colors = [], endows = [], active = true } = data;

  // Kiểm tra xem sản phẩm có trùng ID hay không
  const existingProduct = await Product.findOne({ id });
  if (existingProduct) {
    throw new Error("Product with this ID already exists");
  }

  // Tạo mới sản phẩm
  const newProduct = new Product({ id, name, description, type, attributeValues, colors, endows, active });
  return await newProduct.save();
};

const getAllProducts = async () => {
  return await Product.find()
    .populate("attributeValues") // Populate AttributeValues từ ref
    .populate({
      path: "colors",
      populate: [
        {
          path: "inventory.attribute", // Sửa thành populate AttributeValue cho Inventory
        },
      ],
    })
    .populate("endows.id") // Populate Endows từ ref (nếu endows.id là ref)
    .select("-__v"); // Loại bỏ trường '__v'
};

const getProductById = async (id) => {
  return await Product.findOne({ _id: id }) // Truy vấn theo _id của sản phẩm
    .populate("attributeValues colors.inventory.attribute endows") // Populate các trường liên quan
    .select("-__v") // Loại bỏ trường '__v'
    .exec(); // Đảm bảo trả về Promise
};


const updateProductById = async (id, data) => {
 

  try{
  // Kiểm tra xem sản phẩm có tồn tại không
  const updatedProduct = await Product.findOneAndUpdate({ id }, data, { new: true })
    .populate("attributeValues colors.inventory.attribute endows") // Populating các liên kết
    .select("-__v"); // Loại bỏ trường '__v'
   
    //const te = Product.findOne({ productID: id });
    console.log(updatedProduct)

  
  return updatedProduct ;
}
catch(e){
  console.log(e)
}
};

const deleteProductById = async (id) => {
  const deletedProduct = await Product.findOneAndDelete({ id });
  if (!deletedProduct) {
    throw new Error("Product not found");
  }
  return deletedProduct;
};

async function getRecentProductsByType(type, limit) {
  try {
    return await Product.find({ type, active: true }) // Thêm điều kiện lọc active: true
      .sort({ createdAt: -1 })
      .limit(limit);
  } catch (error) {
    console.error("Error fetching recent products:", error.message);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
}
const getProductsByType = async (type) => {
  try {
    return await Product.find({ type })
      .select("-__v");
  } catch (error) {
    throw new Error(`Error fetching products by type: ${error.message}`);
  }
};

const searchProductsByName = async (searchTerm) => {
  try {
    console.log("MA "+searchTerm)
    // Kiểm tra nếu searchTerm rỗng hoặc chỉ chứa khoảng trắng
    if (!searchTerm || searchTerm.trim().length === 0) {
      return [];  // Trả về mảng rỗng nếu searchTerm không hợp lệ
    }

    // Tách chuỗi tìm kiếm thành các từ khóa riêng biệt (ngắt bằng khoảng trắng)
    const searchTerms = searchTerm.trim().toLowerCase().split(/\s+/);

    // Tạo điều kiện tìm kiếm để tất cả từ khóa phải có trong tên sản phẩm
    const searchConditions = searchTerms.map(term => ({
      name: { $regex: term, $options: 'i' }  // Sử dụng regex để tìm kiếm không phân biệt chữ hoa chữ thường
    }));

    // Tìm sản phẩm thỏa mãn tất cả các điều kiện
    return await Product.find({
      $and: searchConditions  // Đảm bảo tất cả từ khóa đều xuất hiện trong tên sản phẩm
    })
      .select("-__v")
      .populate("attributeValues colors.inventory.attribute endows");
  } catch (error) {
    throw new Error(`Error searching products: ${error.message}`);
  }
};




module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getRecentProductsByType,
  getProductsByType,
  searchProductsByName
};
