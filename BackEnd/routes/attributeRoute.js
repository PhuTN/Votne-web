const express = require("express");
const { body, validationResult } = require("express-validator");

const attributeService = require("../services/attributeService");
const Attribute = require("../models/Attribute");
const AttributeValue = require("../models/AttributeValue");
const router = express.Router();



/**
 * @swagger
 * /api/attributes/type/{type}:
 *   get:
 *     summary: Get attributes by type
 *     description: Returns all attributes that match the specified type, including their associated values.
 *     parameters:
 *       - name: type
 *         in: path
 *         description: Type of the attribute (e.g., 'color', 'size')
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of attributes with their values
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   values:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *       404:
 *         description: No attributes found with the specified type
 *       500:
 *         description: Server error
 */

router.get("/type/:type", async (req, res) => {
  const { type } = req.params; // Lấy type từ params
  try {
    const attributes = await attributeService.getAttributesByType(type);
    if (attributes.length === 0) {
      return res.status(404).json({ error: `No attributes found with type: ${type}` });
    }
    res.status(200).json(attributes); // Trả về danh sách các attribute có type tương ứng
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// CREATE - Tạo Attribute mới
router.post(
  "/",
  
  [
    body("id").notEmpty().withMessage("ID is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("values").optional().isArray().withMessage("Values must be an array of ObjectIds"),
    body("active").optional().isBoolean().withMessage("Active must be a boolean"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newAttribute = await attributeService.createAttribute(req.body);
      res.status(201).json({
        message: "Attribute created successfully",
        data: newAttribute,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// READ ALL - Lấy tất cả Attributes
router.get("/", async (req, res) => {
  try {
    const attributes = await attributeService.getAllAttributes();
    res.status(200).json(attributes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE - Lấy Attribute theo ID
router.get("/:id", async (req, res) => {
  try {
    const attribute = await attributeService.getAttributeById(req.params.id);
    if (!attribute)
      return res.status(404).json({ error: "Attribute not found" });
    res.status(200).json(attribute);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // UPDATE - Cập nhật Attribute
// router.put(
//   "/:id",
 
//   [
//     body("values").optional().isArray().withMessage("Values must be an array of ObjectIds"),
//     body("active").optional().isBoolean().withMessage("Active must be a boolean"),
//   ],
//   async (req, res) => {
//     try {
//       const updatedAttribute = await attributeService.updateAttributeById(
//         req.params.id,
//         req.body
//       );
//       if (!updatedAttribute)
//         return res.status(404).json({ error: "Attribute not found" });
//       res.status(200).json({
//         message: "Attribute updated successfully",
//         data: updatedAttribute,
//       });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// );

// DELETE - Xóa Attribute
router.delete("/:id", 
   async (req, res) => {
  try {
    await attributeService.deleteAttributeById(req.params.id);
    res.status(200).json({ message: "Attribute deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




/**
 * @swagger
 * /api/attributes/name/brand:
 *   get:
 *     summary: Get attributes by name "Thương hiệu"
 *     description: Returns all attributes where the name is "Thương hiệu".
 *     responses:
 *       200:
 *         description: List of attributes with name "Thương hiệu"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   values:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *       404:
 *         description: No attributes found with name "Thương hiệu"
 *       500:
 *         description: Server error
 */
router.get("/name/brand", async (req, res) => {
  try {
    const attributes = await attributeService.getAttributesByName("Thương hiệu");
    if (attributes.length === 0) {
      return res.status(404).json({ error: "No attributes found with name: Thương hiệu" });
    }
    res.status(200).json(attributes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






// API: Cập nhật tất cả Attributes và AttributeValues
router.put("/bulk-update", async (req, res) => { 
  const attributes = req.body; // Mảng Attribute từ body request
  
  if (!Array.isArray(attributes)) {
    return res.status(400).json({ error: "Input must be an array" });
  }

  try {
    // Lặp qua từng attribute trong danh sách
    for (const attribute of attributes) {
      const { _id, id, name, type, values, active } = attribute;


      for (const value of values) {
        // Nếu không có _id trong value, tạo mới _id
        

        // Tìm AttributeValue đã tồn tại
        let valueData = await AttributeValue.findOne( {
          $expr: { $eq: [{ $toString: "$_id" }, value._id] }
      });

        if (valueData) {
          // Nếu AttributeValue đã tồn tại, cập nhật
          Object.assign(valueData, value);
        } else {
          // Nếu không có AttributeValue, tạo mới
          valueData = new AttributeValue(value);
          await valueData.save()
          console.log(value)
          console.log(valueData)
        }

      
      }


      // Cập nhật hoặc tạo Attribute
      const updatedAttribute = await Attribute.findOne( {
        $expr: { $eq: [{ $toString: "$_id" }, _id] }
     }); // Tìm Attribute

    

     if (updatedAttribute) {
      // Nếu Attribute đã tồn tại, cập nhật
      updatedAttribute.id = id;
      updatedAttribute.name = name;
      updatedAttribute.type = type;
      updatedAttribute.active = active;
    
      // Lấy danh sách `_id` từ values
      updatedAttribute.values = values ? values.map(value => ({ _id: value._id })) : [];
      await updatedAttribute.save();
     } else {
      // Nếu không có Attribute, tạo mới với danh sách values chỉ chứa `_id`
      const valueIds = values ? values.map(value => ({ _id: value._id })) : [];
      const newAttribute = new Attribute({ _id, id, name, type, values: valueIds, active });
      
      await newAttribute.save();
     }


      // Lặp qua các AttributeValue để cập nhật hoặc tạo mới
      const updatedValues = [];
      

      // Gắn lại danh sách values vào attribute
     
    }

    res.status(200).json({ message: "Bulk update successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});



module.exports = router;

