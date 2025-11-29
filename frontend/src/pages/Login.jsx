import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const nav = useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await api.post('/auth/login',{ email, password });
      localStorage.setItem('token', res.data.token);
      // optionally sync guest cart server-side
      nav('/');
    }catch(e){ alert('Login failed'); }
  };
  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder='password' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
      <button type='submit'>Login</button>
    </form>
  );
}
