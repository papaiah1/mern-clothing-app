import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail(){
  const { id } = useParams();
  const nav = useNavigate();
  const [product,setProduct]=useState(null);
  const [size,setSize]=useState('');
  const [qty,setQty]=useState(1);
  const { addToCart } = useCart();

  useEffect(()=>{ fetchProduct(); }, [id]);

  const fetchProduct = async ()=> {
    try{
      const res = await api.get('/products/'+id);
      setProduct(res.data);
      if(res.data.sizes && res.data.sizes.length) setSize(res.data.sizes[0]);
    }catch(e){ console.error(e); }
  };

  const handleAdd = ()=>{
    addToCart(product, size, qty);
    alert('Added to cart');
    nav('/cart');
  };

  if(!product) return <div>Loading...</div>;
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <p>Category: {product.category}</p>
      {product.sizes?.length ? (
        <div>
          <label>Size</label>
          <select value={size} onChange={e=>setSize(e.target.value)}>
            {product.sizes.map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      ) : null}
      <div>
        <label>Qty</label>
        <input type='number' min={1} value={qty} onChange={e=>setQty(Number(e.target.value))} />
      </div>
      <button onClick={handleAdd}>Add to cart</button>
    </div>
  );
}
