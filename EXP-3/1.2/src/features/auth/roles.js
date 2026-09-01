export const ROLES = { ADMIN: 'admin', EDITOR: 'editor', VIEWER: 'viewer' }

export const permissions = {
  admin: ['create','read','update','delete','manage_users'],
  editor: ['create','read','update'],
  viewer: ['read']
}

export function hasPermission(user, permission){
  if(!user || !user.role) return false
  const perms = permissions[user.role] || []
  return perms.includes(permission)
}

export function hasRole(user, role){ if(!user) return false; return user.role === role }
