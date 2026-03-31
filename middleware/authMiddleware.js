const jwt = require("jsonwebtoken");

function protect(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Token required",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    req.user = payload;
    next();
  });
}



function admin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Admin only",
    });
  }
}

module.exports = { protect, admin };