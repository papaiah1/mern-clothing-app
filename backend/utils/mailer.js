const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
const sendOrderEmail = async (to, order) => {
  const itemsHtml = order.items.map(i => `<li>${i.name} (Size: ${i.size}) x ${i.qty} — ₹${i.price}</li>`).join('');
  const html = `
    <h2>Order Confirmation</h2>
    <p>Order ID: <strong>${order._id}</strong></p>
    <p>Order Date: ${order.orderDate}</p>
    <ul>${itemsHtml}</ul>
    <p>Total: ₹${order.totalPrice}</p>
  `;
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject: 'Your order confirmation',
    html
  });
};
module.exports = { sendOrderEmail };
