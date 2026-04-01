const jwt = require("jsonwebtoken");

const User = require("../models/User");

async function protect(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({
      message: "Token required",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    try {
      const user = await User.findById(payload.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });
}



function admin(req, res, next) {
  console.log(req.user);

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Admin only",
    });
  }
}

module.exports = { protect, admin };