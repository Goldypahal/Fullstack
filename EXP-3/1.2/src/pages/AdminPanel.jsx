import React from 'react'
import PermissionGate from '../components/PermissionGate'

export default function AdminPanel(){
  return (
    <div>
      <h2>Admin Panel</h2>
      <PermissionGate permission="manage_users">
        <p>Here you can manage users and perform admin tasks.</p>
      </PermissionGate>
    </div>
  )
}
