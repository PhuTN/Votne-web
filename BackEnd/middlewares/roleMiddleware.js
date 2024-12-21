// Middleware kiểm tra role
const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }
  
      next(); // Tiếp tục nếu người dùng có quyền
    };
  };
  
  module.exports = roleMiddleware;
  