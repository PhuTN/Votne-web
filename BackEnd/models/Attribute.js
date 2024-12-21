const mongoose = require("mongoose");
const AttributeValue = require("./AttributeValue");  // Import AttributeValue model

const attributeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  values: [{ type: mongoose.Schema.Types.ObjectId, ref: "AttributeValue" }], // Mảng chứa các object AttributeValue
  active: { type: Boolean, default: true }, // Trường active kiểu boolean
});

module.exports = mongoose.model("Attribute", attributeSchema);
