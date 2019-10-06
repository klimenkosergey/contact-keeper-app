const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  // If there is no token
  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Set user from token to req
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Authorization denied' });
  }
};
