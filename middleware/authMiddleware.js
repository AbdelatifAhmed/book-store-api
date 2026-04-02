const jwt = require("jsonwebtoken");

const User = require("../models/User");

async function protect(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Token required",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(403).json({
        status: 403,
        message: "Invalid token",
      });
    }

    try {
      const user = await User.findById(payload.id).select("-password");
      if (!user) {
        return res.status(404).json({ status: 404, message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ status: 500, message: "Server error" });
    }
  });
}



function admin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      status: 403,
      message: "Admin only",
    });
  }
}

module.exports = { protect, admin };