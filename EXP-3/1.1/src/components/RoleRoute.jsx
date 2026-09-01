import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function RoleRoute({ children, allowedRoles=[] }){
  const user = useSelector(s=>s.auth.user)
  if(!user) return <Navigate to="/login" replace />
  if(!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />
  return children
}
