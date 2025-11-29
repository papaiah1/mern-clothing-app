import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function OrdersPage(){
  const [orders,setOrders]=useState([]);
  useEffect(()=>{ fetchOrders(); }, []);
  const fetchOrders = async ()=>{
    try{
      const res = await api.get('/orders');
      setOrders(res.data);
    }catch(e){ console.error(e); }
  };
  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length===0 ? <p>No orders yet</p> : orders.map(o=>(
        <div key={o._id} style={{border:'1px solid #eee', padding:10, marginBottom:10}}>
          <p>Order ID: {o._id}</p>
          <p>Date: {new Date(o.orderDate).toLocaleString()}</p>
          <p>Total: ₹{o.totalPrice}</p>
          <ul>{o.items.map(it=> <li key={it._id}>{it.name} (Size: {it.size}) x {it.qty} — ₹{it.price}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}
