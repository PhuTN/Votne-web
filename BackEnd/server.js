const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");
const path = require("path");

// Import các route
const attributeValueRoutes = require("./routes/attributeValueRoutes");
const attributeRoutes = require("./routes/attributeRoute");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cartRoute");
const orderRoutes = require("./routes/orderRoute");
const uploadRoutes = require("./routes/uploadRouter"); // Route cho upload ảnh

// Load .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Simple Route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js + MongoDB API!");
});

// Routes
app.use("/api/attribute-values", attributeValueRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes); // Thêm route upload

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Cung cấp file ảnh từ thư mục "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
