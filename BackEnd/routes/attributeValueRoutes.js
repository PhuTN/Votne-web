const express = require("express");
const { body, validationResult } = require("express-validator");


const attributeValueService = require("../services/attributeValueService");
const router = express.Router();

// CREATE - Tạo AttributeValue mới
router.post(
  "/",
 
  [
    body("id").notEmpty().withMessage("ID is required"),
    body("value").notEmpty().withMessage("Value is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newAttributeValue = await attributeValueService.createAttributeValue(req.body);
      res.status(201).json({ message: "AttributeValue created successfully", data: newAttributeValue });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// READ ALL - Lấy tất cả AttributeValues
router.get("/", async (req, res) => {
  try {
    const attributeValues = await attributeValueService.getAllAttributeValues();
    res.status(200).json(attributeValues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE - Lấy AttributeValue theo ID
router.get("/:id", async (req, res) => {
  try {
    const attributeValue = await attributeValueService.getAttributeValueById(req.params.id);
    if (!attributeValue) return res.status(404).json({ error: "AttributeValue not found" });
    res.status(200).json(attributeValue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - Cập nhật AttributeValue
router.put("/:id",  async (req, res) => {
  try {
    const updatedAttributeValue = await attributeValueService.updateAttributeValueById(req.params.id, req.body);
    if (!updatedAttributeValue)
      return res.status(404).json({ error: "AttributeValue not found" });
    res.status(200).json({ message: "AttributeValue updated successfully", data: updatedAttributeValue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Xóa AttributeValue
router.delete("/:id",  async (req, res) => {
  try {
    await attributeValueService.deleteAttributeValueById(req.params.id);
    res.status(200).json({ message: "AttributeValue deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
