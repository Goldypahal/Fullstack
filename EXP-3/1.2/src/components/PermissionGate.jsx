import React from 'react'
import { useSelector } from 'react-redux'
import { hasPermission } from '../features/auth/roles'

export default function PermissionGate({ permission, children, fallback = null }){
  const user = useSelector(s=>s.auth.user)
  return hasPermission(user, permission) ? children : fallback
}
