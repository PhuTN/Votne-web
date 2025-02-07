const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true },
  shippingCostPerKm: { type: Number, required: true },
  images: [{ type: String }],
  rewardMilestones: [
    {
      milestoneName: { type: String, required: true },
      amount: { type: Number, required: true },
      orderCount: { type: Number, required: true },
      discountPercentage: { type: Number, required: true },
      maxDiscountAmount: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model("Settings", settingsSchema);
