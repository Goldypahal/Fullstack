import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

export default function Dashboard(){
  const user = useSelector(s=>s.auth.user)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Dashboard</h2>
      {user && <div>Welcome, <strong>{user.name}</strong> ({user.role})</div>}
      <div style={{marginTop:12}}>
        <button onClick={()=>dispatch(logout())}>Logout</button>
      </div>
    </div>
  )
}
