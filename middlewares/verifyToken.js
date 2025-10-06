const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.cookies.token; // get from cookie
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, "secret"); // same secret as login
    req.user = decoded; // attach decoded info to req
    next(); // allow the request to continue
  } catch (err) {
    return res.status(401).send("Invalid token.");
  }
}

module.exports = verifyToken;
