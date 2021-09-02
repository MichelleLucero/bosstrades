const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).json({ msg: 'no token authorization denied' });
  try {
    const decoded = jwt.verify(token, 'secret'); //todo put this in .env file
    req.member = decoded.member;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is invalid' });
  }
};

module.exports = auth;
