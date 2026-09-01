import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Unauthorized(){
  const nav = useNavigate()
  return (
    <div>
      <h2>Access Denied</h2>
      <p>You do not have permission to access this resource.</p>
      <button onClick={()=>nav('/dashboard')}>Back to Dashboard</button>
    </div>
  )
}
