const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'K@mikaze3290',
  database: 'fashion_store'
});

// Route: GET /api/products
// this is for the shop page
// it fetches all products from the database
router.get('/', (req, res) => {
  const category = req.query.category;

  let query = 'SELECT * FROM products';
  const params = [];

  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
  }

  pool.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
});

// Route: GET /api/products/featured
// this is for the featured products on the home page
// it fetches products that are marked as featured in the database
router.get('/featured', (req, res) => {
  const query = 'SELECT * FROM products WHERE is_featured = 1';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching featured products:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
});

module.exports = router;