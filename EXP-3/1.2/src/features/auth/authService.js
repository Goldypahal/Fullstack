// Mock auth service for EXP-3/1.2 (RBAC)
const USERS = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: '2', name: 'Editor User', email: 'editor@example.com', password: 'editor123', role: 'editor' },
  { id: '3', name: 'Viewer User', email: 'viewer@example.com', password: 'viewer123', role: 'viewer' }
]

function delay(ms=300){ return new Promise(res=>setTimeout(res, ms)) }

export async function login({ email, password }){
  await delay(300 + Math.random()*300)
  const u = USERS.find(x => x.email === email && x.password === password)
  if(!u) throw new Error('Invalid credentials')
  const token = btoa(`${u.id}:${Date.now()}`)
  const payload = { id: u.id, name: u.name, email: u.email, role: u.role }
  localStorage.setItem('exp3_1_2_auth', JSON.stringify({ token, user: payload }))
  return { token, user: payload }
}

export async function logout(){ await delay(100); localStorage.removeItem('exp3_1_2_auth'); return true }

export function restoreSession(){
  try{ return JSON.parse(localStorage.getItem('exp3_1_2_auth')||'null') }catch(e){ return null }
}
