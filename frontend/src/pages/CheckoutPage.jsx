import React from 'react';
import { useCart } from '../context/CartContext';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage(){
  const { cart, clearCart } = useCart();
  const nav = useNavigate();
  const total = cart.reduce((s,it)=> s + (it.price||0) * it.quantity, 0);

  const placeOrder = async ()=>{
    try{
      const payloadItems = cart.map(it=>({ product: it._id, size: it.size, qty: it.quantity }));
      const res = await api.post('/orders/checkout', { items: payloadItems });
      clearCart();
      alert('Order placed. Order ID: ' + res.data.orderId);
      nav('/orders');
    }catch(e){
      console.error(e);
      alert('Checkout failed');
    }
  };

  if(cart.length===0) return <div>No items to checkout</div>;
  return (
    <div>
      <h2>Checkout</h2>
      {cart.map((it,idx)=> <p key={idx}>{it.name} (Size: {it.size}) x {it.quantity} — ₹{it.price}</p>)}
      <h3>Total: ₹{total}</h3>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
