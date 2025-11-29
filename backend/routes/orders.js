const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { sendOrderEmail } = require('../utils/mailer');

router.post('/checkout', auth, async (req, res) => {
  try {
    const { items } = req.body;
    const detailed = [];
    let total = 0;
    for (const it of items) {
      const p = await Product.findById(it.product);
      if (!p) return res.status(400).json({ message: 'Product not found' });
      const price = p.price;
      detailed.push({ product: p._id, name: p.name, size: it.size, qty: it.qty, price });
      total += price * it.qty;
    }
    const order = new Order({ user: req.user._id, items: detailed, totalPrice: total });
    await order.save();
    await Cart.findOneAndDelete({ user: req.user._id });
    try { await sendOrderEmail(req.user.email, order); } catch (e) { console.error('Email failed', e); }
    res.json({ orderId: order._id, order });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
