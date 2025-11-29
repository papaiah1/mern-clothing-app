import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';

export default function HomePage(){
  const [products,setProducts]=useState([]);
  const [page,setPage]=useState(1);
  const [total,setTotal]=useState(0);
  const [filters,setFilters]=useState({});

  useEffect(()=>{ fetchProducts(); }, [page, filters]);

  const fetchProducts = async ()=>{
    try{
      const params = { page, limit: 12, ...filters };
      const res = await api.get('/products', { params });
      setProducts(res.data.products || []);
      setTotal(res.data.total || 0);
    }catch(e){ console.error(e); }
  };

  return (
    <div>
      <h1>Catalog</h1>
      <ProductFilters onChange={setFilters} />
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12}}>
        {products.map(p=> <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
