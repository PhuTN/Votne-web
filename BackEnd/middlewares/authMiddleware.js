const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware kiểm tra token
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization'); // Lấy token từ header 'Authorization'
 

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Xác thực và giải mã token
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET); // Lấy phần token sau "Bearer"

    // Lưu thông tin user vào request để sử dụng ở các phần tiếp theo
    req.user = await User.findById(decoded.userId);


   
    next(); // Tiến hành tiếp
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
