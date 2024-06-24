const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

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
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.profile = async (req, res) => {
    try {
        
      const user = await User.findById(req.user.id).select('-password'); // Exclure le mot de passe des résultats
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.changePass = async (req, res) => {
  //console.log('miditra change passowrd')
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;
  //console.log(req.user.id)

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  