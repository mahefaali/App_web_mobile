const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'orion_fotsiny';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};




exports.register = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  try {
    const user = await User.create({ firstName, lastName, username, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
        expiresIn: '1h',
    });
    res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.profile = async (req, res) => {
    try {
        console.log(req.user)
      const user = await User.findById(req.user.id).select('-password'); // Exclure le mot de passe des résultats
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };