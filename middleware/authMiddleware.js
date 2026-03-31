const jwt = require("jsonwebtoken");

function protect(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      message: "Token required",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
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