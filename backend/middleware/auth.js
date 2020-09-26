const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //get the token from the cookies
  const token = req.cookies['auth_token'];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Akses ditolak. Mohon login terlebih dahulu.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.get("secretkey"));
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Akses kadaluarsa. Silakan login kembali.");
  }
};
