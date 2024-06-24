const express = require('express');
const jwt = require('jsonwebtoken');
const { register, login, profile, changePass } = require('../controllers/authController');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ message: 'Token is not valid' });
    }
    req.user = user;
    next();
  });
};

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, profile);
router.post('/change-password', authenticateToken, changePass);

module.exports = router;
