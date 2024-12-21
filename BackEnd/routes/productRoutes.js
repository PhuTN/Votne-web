const express = require("express");
const { body, validationResult } = require("express-validator");


const productService = require("../services/productService");
const Product = require("../models/Product");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API quản lý Products
 */

/**
 * @swagger
 * /api/products/by-type:
 *   get:
 *     summary: Lấy tất cả sản phẩm theo loại
 *     tags: [Products]
 *     parameters:
 *       - name: type
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "Vợt"
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm theo loại
 *       400:
 *         description: Type is required
 *       500:
 *         description: Server error
 */
router.get("/by-type", async (req, res) => {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ error: "Type parameter is required" });
  }

  try {
    const products = await productService.getProductsByType(type);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/products/recent:
 *   get:
 *     summary: Lấy 5 sản phẩm mới nhất theo danh sách các loại
 *     tags: [Products]
 *     parameters:
 *       - name: types
 *         in: query
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Vợt", "Balo"]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm mới nhất từ các loại
 *       400:
 *         description: Types is required
 *       500:
 *         description: Server error
 */
router.get("/recent", async (req, res) => {
  const types = req.query.types;

  if (!types || !Array.isArray(types)) {
    return res.status(400).json({ error: "Types parameter is required and must be an array" });
  }

  try {
    const productsByType = await Promise.all(
      types.map(async (type) => productService.getRecentProductsByType(type, 5))
    );

    // Gom tất cả sản phẩm vào một mảng duy nhất
    const mergedProducts = productsByType.flat();

    res.status(200).json(mergedProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
    
  }
});


// Hàm tạo ID ngẫu nhiên
function generateRandomId() {
  return Math.random().toString(36).substr(2, 9); // Tạo chuỗi ngẫu nhiên gồm 9 ký tự
}

router.post(
  "/",
  [
    body("type").notEmpty().withMessage("Type is required"),
  ],
  async (req, res) => {
    // Kiểm tra lỗi xác minh
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Tạo một sản phẩm mới với dữ liệu mẫu cho từng trường
      const newProductData = {
        id: generateRandomId(),
        type: req.body.type || "Electronics",  // Type mẫu
        name: "Sample Product",  // Name mẫu
        description: "This is a sample product description.",  // Description mẫu
        brand: "Sample Brand",  // Brand mẫu
        attributeValues: [],  // Attribute values mẫu (để trống hoặc thêm dữ liệu ví dụ)
        colors: [
          {
            id: generateRandomId(),
            colorName: "Red",  // Màu sắc mẫu
            images: ["https://e7.pngegg.com/pngimages/116/748/png-clipart-rakieta-tenisowa-racket-cartoon-tennis-racket-cartoon-character-photography-thumbnail.png"],  // Ảnh mẫu
            price: 100,  // Giá mẫu
            discountPrice: 80,  // Giá giảm mẫu
            inventory: [
             
            ]
          }
        ],
        endows: [
          {
            id: generateRandomId(),
            description: "Sample endow description",  // Mô tả quà tặng mẫu
            active: true  // Quà tặng có sẵn
          }
        ],
        sold: 0,  // Số lượng đã bán mẫu
        active: true,  // Trạng thái sản phẩm có sẵn
      };

      // Tạo sản phẩm mới
      const newProduct = await Product.create(newProductData);

      // Trả về thông tin sản phẩm mới tạo
      res.status(201).json({
        message: "Product created successfully",
        productId: newProduct._id,  // Trả về _id của sản phẩm mới tạo
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
);


// READ ALL - Lấy danh sách Products
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Lấy danh sách tất cả Products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách Products
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ PRODUCT BY ID - Lấy thông tin một sản phẩm theo ID
/**
 * @swagger
 * /api/products/id:
 *   get:
 *     summary: Lấy thông tin một sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: 6751d5f8293c5b58e0403b7f
 *     responses:
 *       200:
 *         description: Thông tin sản phẩm
 *       400:
 *         description: ID parameter is required
 *       404:
 *         description: Sản phẩm không tìm thấy
 *       500:
 *         description: Lỗi máy chủ
 */
router.get("/id", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID parameter is required" });
  }

  try {
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE - Cập nhật Product
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Cập nhật thông tin một Product (Chỉ Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 12345
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  
  
  
  async (req, res) => {
    try {
      const updatedProduct = await productService.updateProductById(req.params.id, req.body);
      res.status(200).json({
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// DELETE - Xóa Product
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Xóa một Product (Chỉ Admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 12345
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", 
   
   async (req, res) => {
  try {
    await productService.deleteProductById(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Tìm kiếm sản phẩm theo tên
 *     tags: [Products]
 *     parameters:
 *       - name: search
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "Vợt cầu lông"
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm tìm được
 *       400:
 *         description: Search term is required
 *       500:
 *         description: Server error
 */
router.get("/search", async (req, res) => {
  const { search } = req.query;

  if (!search || search.trim().length === 0) {
    // Kiểm tra nếu search là null, undefined hoặc có độ dài 0 sau khi loại bỏ khoảng trắng
    return res.status(200).json([]); // Trả về mảng rỗng nếu không có từ khóa
  }

  try {
    // Nếu có từ khóa tìm kiếm, gọi service để tìm sản phẩm
    const products = await productService.searchProductsByName(search.trim());
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
