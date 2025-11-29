import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const nav = useNavigate();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await api.post('/auth/register',{ name, email, password });
      localStorage.setItem('token', res.data.token);
      nav('/');
    }catch(e){ alert('Register failed'); }
  };
  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder='name' value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder='password' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
      <button type='submit'>Register</button>
    </form>
  );
}
