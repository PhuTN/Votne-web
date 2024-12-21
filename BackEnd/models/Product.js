const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  attribute: { type: mongoose.Schema.Types.ObjectId, ref: "AttributeValue" },
  number: { type: Number, required: true },
});

const endowSchema = new mongoose.Schema({
  id: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, default: true },
});

const colorSchema = new mongoose.Schema({
  id: { type: String, required: true },
  colorName: { type: String, required: true },
  images: [{ type: String }],
  price: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  inventory: [inventorySchema], // Sử dụng inventorySchema với AttributeValue
});

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String,  },
    description: { type: String,  },
    type: { type: String, required: true },
    brand: { type: String }, // Thêm trường brand
    attributeValues: [{ type: mongoose.Schema.Types.ObjectId, ref: "AttributeValue" }],
    colors: [colorSchema],
    endows: [endowSchema],
    sold: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Product", productSchema);
