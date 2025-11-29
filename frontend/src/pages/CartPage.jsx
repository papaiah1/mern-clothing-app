import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage(){
  const { cart, updateQty, removeItem } = useCart();
  const nav = useNavigate();
  const total = cart.reduce((s,it)=> s + (it.price||0) * it.quantity, 0);
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length===0 ? <p>Cart is empty</p> : (
        <div>
          {cart.map((it,idx)=>(
            <div key={idx} style={{borderBottom:'1px solid #eee', padding:8}}>
              <h4>{it.name}</h4>
              <p>Size: {it.size || 'N/A'}</p>
              <p>Price: ₹{it.price}</p>
              <input type='number' value={it.quantity} min={1} onChange={e=>updateQty(it._id, it.size, Number(e.target.value))} />
              <button onClick={()=>removeItem(it._id, it.size)}>Remove</button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={()=>nav('/checkout')}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}
