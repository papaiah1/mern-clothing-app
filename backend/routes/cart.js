const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/authMiddleware');

router.post('/save', async (req, res) => {
  try {
    const { userId, items, cartId } = req.body;
    let cart;
    if (cartId) cart = await Cart.findById(cartId);
    if (cart) {
      cart.items = items;
      cart.updatedAt = Date.now();
      await cart.save();
    } else {
      cart = new Cart({ user: userId || null, items });
      await cart.save();
    }
    res.json(cart);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
