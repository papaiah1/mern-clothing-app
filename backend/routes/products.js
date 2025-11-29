const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const { search, category, size, min, max, page = 1, limit = 10 } = req.query;
    const query = {};
    if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    if (category) query.category = category;
    if (size) query.sizes = size;
    if (min || max) query.price = {};
    if (min) query.price.$gte = Number(min);
    if (max) query.price.$lte = Number(max);

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).skip(skip).limit(Number(limit));
    res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
