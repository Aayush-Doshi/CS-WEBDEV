const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

console.log("🔐 Loaded JWT Secret:", secret);
module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("🛡️ Incoming Auth Header:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  console.log("🔎 Extracted Token:", token);

  if (!token) {
    console.log("🚫 No token provided");
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log("❌ JWT Verification Failed:", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    console.log("✅ Token Verified! Decoded user:", user);
    req.user = user;
    next();
  });
};
