const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');
const connectDB = require('../config/db');

const demo = [
  { name: 'Classic White T-Shirt', description: 'Soft cotton tee', price: 499, image: '', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Blue Denim Jacket', description: 'Rugged denim jacket', price: 2499, image: '', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Slim Fit Jeans', description: 'Comfort stretch', price: 1599, image: '', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Black Hoodie', description: 'Fleece lined', price: 1299, image: '', category: 'Men', sizes: ['S','M','L','XL'] },
  { name: 'Floral Dress', description: 'Light summer dress', price: 1999, image: '', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Red Midi Skirt', description: 'A-line skirt', price: 999, image: '', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Silk Blouse', description: 'Elegant evening top', price: 2199, image: '', category: 'Women', sizes: ['S','M'] },
  { name: 'Women Denim Jeans', description: 'High-waist', price: 1599, image: '', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Kids Cartoon Tee', description: '100% cotton', price: 399, image: '', category: 'Kids', sizes: ['S','M'] },
  { name: 'Kids Joggers', description: 'Soft and stretchy', price: 599, image: '', category: 'Kids', sizes: ['S','M','L'] },
  { name: 'Unisex Sports Cap', description: 'Breathable', price: 299, image: '', category: 'Men', sizes: [] },
  { name: 'Leather Belt', description: 'Genuine leather', price: 799, image: '', category: 'Men', sizes: [] },
  { name: 'Summer Shorts', description: 'Casual shorts', price: 699, image: '', category: 'Men', sizes: ['M','L'] },
  { name: 'Cardigan', description: 'Knitted cardigan', price: 1399, image: '', category: 'Women', sizes: ['S','M','L'] },
  { name: 'Party Gown', description: 'Floor length', price: 4999, image: '', category: 'Women', sizes: ['M','L'] },
  { name: 'Puffer Jacket', description: 'Warm winter jacket', price: 3999, image: '', category: 'Men', sizes: ['M','L','XL'] },
  { name: 'Running Shoes', description: 'Lightweight', price: 2999, image: '', category: 'Men', sizes: [] },
  { name: 'Girls Dress', description: 'Playful print', price: 1299, image: '', category: 'Kids', sizes: ['S','M'] },
  { name: 'Boys Hoodie', description: 'Cozy hoodie', price: 999, image: '', category: 'Kids', sizes: ['S','M','L'] },
  { name: 'Denim Overalls', description: 'Trendy', price: 1599, image: '', category: 'Women', sizes: ['S','M'] }
];

(async () => {
  await connectDB(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(demo);
  console.log('Seeded products');
  process.exit(0);
})();
