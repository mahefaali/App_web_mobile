const express = require('express');
const jwt = require('jsonwebtoken');
const { register, login, profile } = require('../controllers/authController');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, profile);

module.exports = router;
