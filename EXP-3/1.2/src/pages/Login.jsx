import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(s=>s.auth)
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    const res = await dispatch(login({ email, password }))
    if(res.meta.requestStatus === 'fulfilled') nav('/dashboard')
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div><button type="submit">{auth.status==='loading'?'Signing in...':'Sign In'}</button></div>
        {auth.error && <div className="error">{auth.error}</div>}
      </form>
      <div className="muted">Demo credentials: admin/editor/viewer @ example.com (see README)</div>
    </div>
  )
}
