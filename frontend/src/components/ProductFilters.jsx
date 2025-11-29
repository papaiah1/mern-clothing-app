import React, { useState } from 'react';
export default function ProductFilters({ onChange }) {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const apply = () => onChange({ search: q, category, size, min, max });
  return (
    <div style={{ marginBottom: 12 }}>
      <input placeholder='search' value={q} onChange={e=>setQ(e.target.value)} />
      <select value={category} onChange={e=>setCategory(e.target.value)}>
        <option value=''>All</option><option>Men</option><option>Women</option><option>Kids</option>
      </select>
      <select value={size} onChange={e=>setSize(e.target.value)}>
        <option value=''>Size</option><option>S</option><option>M</option><option>L</option><option>XL</option>
      </select>
      <input placeholder='min' value={min} onChange={e=>setMin(e.target.value)} style={{width:80}}/>
      <input placeholder='max' value={max} onChange={e=>setMax(e.target.value)} style={{width:80}}/>
      <button onClick={apply}>Apply</button>
    </div>
  );
}
