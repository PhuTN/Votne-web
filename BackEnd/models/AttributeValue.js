const mongoose = require("mongoose");

const attributeValueSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  active: { type: Boolean, default: true }, // Thêm trường active kiểu boolean
});

module.exports = mongoose.model("AttributeValue", attributeValueSchema);
