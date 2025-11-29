const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      size: String,
      qty: Number,
      price: Number
    }
  ],
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);
