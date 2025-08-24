const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'; // put in .env later

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, surname, email, password } = req.body;

  if (!name || !surname || !email || !password)
    return res.status(400).json({ message: 'Please fill in all fields!' });

  try {
    // Check if email exists
    const [existing] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0)
      return res.status(400).json({ message: 'Email already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Insert user
    const [result] = await db.promise().query(
      'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)',
      [name, surname, email, hashed]
    );

    // Generate token
    // made the token expire in 15 minutes
    const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: '15m' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: result.insertId, name, surname, email }
    });
  } catch (err) {
    console.error('Could not register user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Please fill in all fields' });

  try {
    // Find user
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0)
      return res.status(400).json({ message: 'Invalid User' });

    const user = rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid Password' });

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '15m' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
