const express = require('express');
const router = express.Router();
const db = require('../db/db'); // use shared db
const verifyToken = require('../middleware/authMiddleware');

// Get cart for a user
router.get('/:userId', verifyToken, (req, res) => {
  if (parseInt(req.params.userId) !== req.user.id) {
    return res.status(403).json({ error: 'You can only view your own cart' });
  }

  const query = `
    SELECT c.product_id, c.quantity, p.title, p.price, p.image
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;
  db.query(query, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Add new item to cart
router.post('/', verifyToken, (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (user_id !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized action' });
  }

  const query = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)
  `;
  db.query(query, [req.user.id, product_id, quantity || 1], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Item added/updated in cart' });
  });
});

// Update item quantity
router.put('/:userId/:productId', verifyToken, (req, res) => {
  if (parseInt(req.params.userId) !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized action' });
  }

  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }

  const query = 'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?';
  db.query(query, [quantity, req.user.id, productId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Cart updated', affectedRows: result.affectedRows });
  });
});

// Remove item from cart
router.delete('/:userId/:productId', verifyToken, (req, res) => {
  if (parseInt(req.params.userId) !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized action' });
  }

  const { productId } = req.params;
  const query = 'DELETE FROM cart WHERE user_id = ? AND product_id = ?';
  db.query(query, [req.user.id, productId], (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Item removed from cart' });
  });
});

module.exports = router;
