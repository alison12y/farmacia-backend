const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: 'Invalid token format' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { verifyToken };