const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      size: String,
      qty: Number,
      price: Number
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Cart', cartSchema);
