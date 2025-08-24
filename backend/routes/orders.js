const express = require('express');
const router = express.Router();
const db = require('../db/db');
const verifyToken = require('../middleware/authMiddleware');

// Create new order
router.post('/', verifyToken, (req, res) => {
  const { user_id, shipping_address, city, postal_code, country, payment_method } = req.body;

  if (user_id !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized action' });
  }

  if (!shipping_address || !city || !postal_code || !country) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const cartQuery = `
    SELECT c.product_id, c.quantity, p.price
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;
  db.query(cartQuery, [req.user.id], (err, cartItems) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (cartItems.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderQuery = `
      INSERT INTO orders (user_id, total, shipping_address, city, postal_code, country, payment_method)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(orderQuery, [req.user.id, total, shipping_address, city, postal_code, country, payment_method], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });

      const orderId = result.insertId;

      const orderItemsQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ?
      `;
      const values = cartItems.map(item => [orderId, item.product_id, item.quantity, item.price]);

      db.query(orderItemsQuery, [values], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        db.query('DELETE FROM cart WHERE user_id = ?', [req.user.id], (err) => {
          if (err) return res.status(500).json({ error: 'Database error' });
          res.status(201).json({ message: 'Order placed successfully', orderId });
        });
      });
    });
  });
});

// Get all orders for a user
router.get('/:userId', verifyToken, (req, res) => {
  if (parseInt(req.params.userId) !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized action' });
  }

  const query = `
    SELECT o.id, o.total, o.status, o.created_at,
           oi.product_id, oi.quantity, oi.price,
           p.title, p.image
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;
  db.query(query, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    const orders = {};
    results.forEach(row => {
      if (!orders[row.id]) {
        orders[row.id] = {
          id: row.id,
          total: row.total,
          status: row.status,
          created_at: row.created_at,
          items: []
        };
      }
      orders[row.id].items.push({
        product_id: row.product_id,
        title: row.title,
        image: row.image,
        quantity: row.quantity,
        price: row.price
      });
    });

    res.json(Object.values(orders));
  });
});

// Update order status (⚠️ might be admin-only in future)
router.put('/:id/status', verifyToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'paid', 'shipped', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const query = `UPDATE orders SET status = ? WHERE id = ? AND user_id = ?`;
  db.query(query, [status, id, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(403).json({ error: 'Not allowed to update this order' });
    res.json({ message: 'Order status updated successfully' });
  });
});

module.exports = router;
