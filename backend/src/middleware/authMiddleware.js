const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dotenv = require("dotenv");


// Middleware to protect routes (requires user authentication)
const protect = async (req, res, next) => {
  let token;
  // Check if Authorization header contains Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log(req.headers);
      // Extract token from the Bearer header
      token = req.headers.authorization.split(" ")[1];
      // Verify token and extract user id and role
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user by decoded token id and attach user data to the request (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token expired, please log in again" });
      }
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }
};

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // User is an admin, allow access
  } else {
    return res.status(403).json({ message: "Forbidden: Admin access only" });
  }
};

module.exports = { protect, admin }; 