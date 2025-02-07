const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const nodemailer = require('nodemailer');
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint allows creating a new user without authentication.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               gender:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Failed to create user
 */
const verificationCodes = new Map();

// Cấu hình gửi email
const transporter = nodemailer.createTransport({
  service: "Gmail", // Hoặc dịch vụ khác
  auth: {
    user: "managingagents.se@gmail.com",
    pass: "gtwdyjnrsuimdojf",
  },
});

// POST /api/users/register
router.post("/register", async (req, res) => {
  const { id,username, password, email, phoneNumber, address, gender, dateOfBirth } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("HELLO")
      return res.status(400).json({ message: "Email đã tồn tại." });
    }

    // Tạo mã xác thực và lưu vào bộ nhớ
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(email, { verificationCode, userData: {id, username, password, email, phoneNumber, address, gender, dateOfBirth } });

    // Gửi mã xác thực qua email
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: email,
      subject: "Xác nhận tài khoản",
      text: `Mã xác thực của bạn là: ${verificationCode}`,
    });

    res.status(200).json({ message: "Vui lòng kiểm tra email để xác thực tài khoản." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi khi gửi mã xác thực." });
  }
});

router.post("/addStaff", async (req, res) => {
  const { id, email, username, password, role, phoneNumber } = req.body;

  try {
    // Kiểm tra xem username đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Đã tồn tại email" });
    }
    console.log("HELLO")
   

    // Tạo người dùng mới
    const newUser = new User({
      id,
      username,
      password,
      role,
      email,
      phoneNumber,
      address: "",
      gender: "Male",
      dateOfBirth: new Date(0),
      isActive: true,
    });

    await newUser.save();
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: email,
      subject: "Thông báo tài khoản nhân viên",
      text: `Chào ${username},\n\nBạn đã được thêm vào hệ thống Votne với vai trò ${role}.\nThông tin đăng nhập:\nEmail: ${email}\nMật khẩu: ${password}\n\nVui lòng đăng nhập và đổi mật khẩu để bảo mật tài khoản.`,
    });
    res.status(201).json({ message: "Nhân viên mới đã được thêm thành công.", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi khi thêm nhân viên mới." });
  }
});



// POST /api/users/verify
const Cart = require("../models/Cart"); // Import model Cart
const Order = require("../models/Order");
const Product = require("../models/Product");

router.post("/verify", async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    // Kiểm tra mã xác thực trong bộ nhớ tạm
    const storedData = verificationCodes.get(email);
    if (!storedData || storedData.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Mã xác thực không hợp lệ hoặc đã hết hạn." });
    }

    // Tạo người dùng mới từ dữ liệu lưu trữ
    const { id, username, password, phoneNumber, address, gender, dateOfBirth } = storedData.userData;

    const newUser = new User({
      id,
      username,
      password,
      email,
      phoneNumber,
      address,
      gender,
      dateOfBirth,
      isActive: true, // Kích hoạt tài khoản ngay sau khi xác thực
    });

    await newUser.save();

    // Tạo giỏ hàng cho người dùng mới
    const newCart = new Cart({ 
      id: `cart_${Date.now()}_${Math.floor(Math.random() * 100000)}`, // ID ngẫu nhiên
      iduser: newUser._id, 
      products: [], 
    });

    await newCart.save();

    // Xóa mã xác thực sau khi sử dụng
    verificationCodes.delete(email);

    res.status(201).json({ message: "Tài khoản đã được xác thực và tạo thành công!", userId: newUser._id, cartId: newCart._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi khi xác thực tài khoản." });
  }
});




// POST /api/users/resend-code
router.post("/resend-code", async (req, res) => {
  const { email } = req.body;
  console.log("hello")
  try {
    // Kiểm tra người dùng tồn tại và chưa kích hoạt
    const user = await User.findOne({ email });
    if (!user || user.isActive) {
      console.log("MA")
      return res.status(400).json({ message: "Email không tồn tại hoặc tài khoản đã được kích hoạt." });
    }

    // Kiểm tra mã xác thực còn lưu trong bộ nhớ tạm
    const existingCode = verificationCodes.get(email);
    if (existingCode) {
      // Nếu mã xác thực vẫn còn, gửi lại mã
      await transporter.sendMail({
        from: "your-email@gmail.com",
        to: email,
        subject: "Mã xác thực mới của bạn",
        text: `Mã xác thực của bạn là: ${existingCode.verificationCode}`,
      });

      return res.status(200).json({ message: "Mã xác thực đã được gửi lại. Vui lòng kiểm tra email." });
    }

    // Tạo mã xác thực mới nếu không có mã xác thực trước đó
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Lưu mã xác thực mới vào bộ nhớ
    verificationCodes.set(email, { verificationCode, userData: { email } });

    // Gửi mã mới qua email
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: email,
      subject: "Mã xác thực mới của bạn",
      text: `Mã xác thực của bạn là: ${verificationCode}`,
    });

    res.status(200).json({ message: "Mã xác thực mới đã được gửi. Vui lòng kiểm tra email." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi khi gửi lại mã xác thực." });
  }
});



/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user information by ID
 *     description: This endpoint allows authenticated users or admin to retrieve user details.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 address:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: User not found
 *       403:
 *         description: Access denied
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("locationId"); // Populate locationId

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get user" });
  }
});


router.get("/count/orders", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
 
    res.status(200).json({ totalOrders });
  } catch (error) {
    console.error("Lỗi khi lấy tổng số đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server khi lấy tổng số đơn hàng" });
  }
});
router.get("/count/customers", async (req, res) => {
  try {
    console.log("HELLo")
    const customerCount = await User.countDocuments({ role: "Customer" });
    res.status(200).json({ totalCustomers: customerCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Lỗi khi lấy số lượng khách hàng" });
  }
});
router.get("/count/products", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({});
    res.status(200).json({ totalProducts });
  } catch (error) {
    console.error("Lỗi khi lấy tổng số sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi lấy tổng số sản phẩm" });
  }
});


router.get("/count/revenue", async (req, res) => {
  try {
    console.log("LSDJFLDL")
    const totalRevenue = await Order.aggregate([
      { $match: { status: "Đã giao" } }, // Chỉ lấy các đơn hàng đã giao
      { $unwind: "$products" }, // Tách từng sản phẩm trong đơn hàng
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ["$products.price", "$products.number"] } }, // Tính tổng doanh thu
        },
      },
    ]);

    res.status(200).json({ totalRevenue: totalRevenue[0]?.totalRevenue || 0 });
  } catch (error) {
    console.error("Lỗi khi lấy tổng doanh thu:", error);
    res.status(500).json({ message: "Lỗi server khi lấy tổng doanh thu" });
  }
});

router.get("/report/report1", async (req, res) => {
  try {
    console.log("ELLOLLLLLLL")
    // Truy vấn dữ liệu đơn hàng và nhóm theo tháng, năm bắt đầu từ năm 2025
    const orders = await Order.aggregate([
      {
        $unwind: "$products"  // Tách sản phẩm trong mỗi đơn hàng
      },
      {
        $match: {
          // Lọc các đơn hàng có ngày từ năm 2025 trở đi
          "dayorder": { $gte: new Date("2025-01-01") }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$dayorder" },
            year: { $year: "$dayorder" }
          },
          revenue: { $sum: { $multiply: ["$products.price", "$products.number"] } },
          quantitySold: { $sum: "$products.number" }
        }
      },
      {
        $project: {
          month: { $arrayElemAt: [["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"], { $subtract: ["$_id.month", 1] }] },
          year: "$_id.year",
          revenue: 1,
          quantitySold: 1,
          _id: 0
        }
      },
      {
        $sort: { year: 1, month: 1 }  // Sắp xếp theo năm, tháng
      }
    ]);

    // Trả về dữ liệu cho client
    res.json(orders);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error retrieving report data", error: err });
  }
});






// Kết nối đến MongoDB

// API lấy dữ liệu tỷ lệ bán theo loại sản phẩm (group theo 'type')
router.get("/api/pie-data-by-type", async (req, res) => {
  try {
    // Truy vấn các đơn hàng có sản phẩm được bán trong năm 2025 và populate sản phẩm
    const orders = await Order.aggregate([
      {
        $match: { "dayorder": { $gte: new Date("2025-01-01") } } // Lọc đơn hàng từ năm 2025
      },
      { $unwind: "$products" },  // Tách mảng sản phẩm trong mỗi đơn hàng
      {
        $lookup: {
          from: "products", // Lấy dữ liệu từ collection "products"
          localField: "products.idproduct", // Trường idproduct trong đơn hàng
          foreignField: "_id", // Trường id trong sản phẩm
          as: "productDetails" // Alias cho dữ liệu sản phẩm
        }
      },
      { $unwind: "$productDetails" }, // Tách mảng productDetails để dễ sử dụng
      {
        $group: {
          _id: "$productDetails.type", // Nhóm theo type của sản phẩm
          totalSold: { $sum: "$products.number" } // Tổng số lượng bán của sản phẩm đó
        }
      }
    ]);

    // Định nghĩa dữ liệu cho pie chart
    let salesData = {
      'Vợt': 0,
      'Giày': 0,
      'Áo': 0,
      'Váy': 0,
      'Quần': 0,
      'Túi vợt': 0,
      'Balo': 0,
      'Phụ kiện': 0
    };
    
    // Cập nhật dữ liệu bán cho từng loại sản phẩm
    orders.forEach(order => {
      const productType = order._id.trim(); // Loại bỏ khoảng trắng thừa nếu có
      if (salesData[productType] !== undefined) {
        salesData[productType] += order.totalSold; // Cộng dồn số lượng bán
      } else {
        console.log(`Không tìm thấy ${productType} trong salesData`);
      }
    });
    
  
    
    
    console.log(orders); 
    // Dữ liệu trả về cho pie chart
    const pieData = {
      labels: Object.keys(salesData), // Các loại sản phẩm (type)
      datasets: [
        {
          label: 'Tỷ lệ bán được 2025',
          data: Object.values(salesData), // Dữ liệu tỷ lệ bán cho mỗi loại sản phẩm
          backgroundColor: [
            '#ff5733', '#33ff57', '#3357ff', '#f7c15c', '#d1f7c1', '#fc85ae', '#c6f4ff', '#ffeb64'
          ],
          borderColor: '#fff',
          borderWidth: 1,
        },
      ],
    };

    // Trả về dữ liệu cho client
    res.json(pieData);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving pie data", error: err });
  }
});





/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user information
 *     description: This endpoint allows authenticated users or admin to update user details.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               gender:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       403:
 *         description: Access denied
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    console.log(req.body)
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (updatedUser._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user" });
  }
});
router.put("/:id/wishlist",async (req, res) => {
  try {
    const userId = req.params.id;
    const { wishList } = req.body; // Nhận danh sách sản phẩm yêu thích từ request body
  
    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra quyền cập nhật (chỉ chủ tài khoản hoặc admin mới có thể chỉnh sửa)
    

    // Cập nhật danh sách sản phẩm yêu thích
    user.wishList = wishList;
    await user.save();

    res.status(200).json({ message: "WishList updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update wishList", error: err.message });
  }
});
/**
 * @swagger
 * /api/users/{id}/password:
 *   put:
 *     summary: Update user's password
 *     description: This endpoint allows authenticated users to update their password.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Bad request (e.g., new password is too short)
 *       404:
 *         description: User not found
 *       403:
 *         description: Unauthorized (if not the correct user)
 *       500:
 *         description: Internal server error
 */
router.put("/:id/password", authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Basic validation: Ensure new password is provided
  if (!newPassword) {
    return res.status(400).json({ message: "Mật khẩu mới không được để trống." });
  }

  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Check if the current password is correct
    // const isMatch = await bcrypt.compare(currentPassword, user.password);
const password = currentPassword
    const isMatch = await User.findOne({password});
    if (!isMatch) {
      return res.status(403).json({ message: "Mật khẩu hiện tại không đúng" });
    }

    console.log("new:: " + newPassword)
    // Hash the new password
   // const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khi cập nhật mật khẩu" });
  }
});


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of all users
 *     description: This endpoint allows authenticated users or admin to retrieve a list of all users.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   address:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   dateOfBirth:
 *                     type: string
 *                   role:
 *                     type: string
 *       403:
 *         description: Access denied
 *       500:
 *         description: Failed to retrieve users
 */
router.get("/",  async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the database

    if (!users) {
      return res.status(500).json({ message: "Failed to retrieve users" });
    }

    // Check if the user is an admin (optional)
    // if (req.user.role !== 'admin') {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    res.status(200).json(users); // Return the list of users
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve users" });
    
  }
});


/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update all users' information
 *     description: This endpoint allows an admin to update details for all users at once.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               gender:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: All users updated successfully
 *       403:
 *         description: Access denied (if the user is not admin)
 *       500:
 *         description: Failed to update users
 */
router.put("/", authMiddleware, async (req, res) => {
  // Ensure the logged-in user is an admin
  // if (req.user.role !== 'admin') {
  //   return res.status(403).json({ message: "Access denied" });
  // }

  try {
    // for (const order of orders) {
    //   const updatedOrder = await Order.findByIdAndUpdate(order._id, order, { new: true });
    //   if (updatedOrder) updatedOrders.push(updatedOrder);
    // }



    const  userData  = req.body;
    const updateduserData = [];
    // Update all users with the provided data
    for (const user of userData) {
      const updateduser = await User.findByIdAndUpdate(user._id, user, { new: true });
      if (updateduserData) updateduserData.push(updateduser);
    }


    res.status(200).json({ message: "All users updated successfully!" });
  } catch (err) {
   
    res.status(500).json({ message: "Failed to update users" });
    
  }
});



// POST /api/users/forgot-password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Kiểm tra xem email có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại trong hệ thống." });
    }

    // Tạo mã xác thực
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Lưu mã xác thực vào bộ nhớ tạm
    verificationCodes.set(email, { resetCode, createdAt: Date.now() });

    // Gửi mã xác thực qua email
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: email,
      subject: "Mã đặt lại mật khẩu",
      text: `Mã đặt lại mật khẩu của bạn là: ${resetCode}. Mã có hiệu lực trong 10 phút.`,
    });

    res.status(200).json({ message: "Mã đặt lại mật khẩu đã được gửi qua email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi gửi mã đặt lại mật khẩu." });
  }
});

// POST /api/users/reset-password
router.post("/reset-password", async (req, res) => {
  const { email, resetCode, newPassword } = req.body;

  try {
    // Kiểm tra mã xác thực trong bộ nhớ
    const storedData = verificationCodes.get(email);
    if (!storedData || storedData.resetCode !== resetCode) {
      return res.status(400).json({ message: "Mã xác thực không hợp lệ hoặc đã hết hạn." });
    }

    // Kiểm tra thời gian hết hạn (10 phút)
    const tenMinutes = 10 * 60 * 1000;
    if (Date.now() - storedData.createdAt > tenMinutes) {
      verificationCodes.delete(email);
      return res.status(400).json({ message: "Mã xác thực đã hết hạn." });
    }

    // Cập nhật mật khẩu mới
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại trong hệ thống." });
    }

    user.password = newPassword; // Cần hash mật khẩu nếu cần
    await user.save();

    // Xóa mã xác thực sau khi sử dụng
    verificationCodes.delete(email);

    res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi đặt lại mật khẩu." });
  }
});


module.exports = router;
