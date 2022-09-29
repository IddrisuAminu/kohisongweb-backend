const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) return res.status(401).send("unauthorized access");

  const verify_token = jwt.verify(token, process.env.JWT_SECRET);
  req.user = verify_token;
  next();
};

//isAdmin middleware
const Admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ msg: "Not Authorized" });
  }
};

module.exports = { protect, Admin };
// 
