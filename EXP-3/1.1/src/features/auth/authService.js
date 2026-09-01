// Mock auth service simulating async JWT authentication
const USERS = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: '2', name: 'Editor User', email: 'editor@example.com', password: 'editor123', role: 'editor' },
  { id: '3', name: 'Viewer User', email: 'viewer@example.com', password: 'viewer123', role: 'viewer' }
]

function delay(ms){ return new Promise(res=>setTimeout(res, ms)) }

export async function login({ email, password }){
  await delay(400 + Math.random()*400)
  const user = USERS.find(u=>u.email===email && u.password===password)
  if(!user) throw new Error('Invalid credentials')
  // simulate token (NOT secure)
  const token = btoa(`${user.id}:${Date.now()}`)
  const payload = { id: user.id, name: user.name, email: user.email, role: user.role }
  // store in localStorage
  localStorage.setItem('exp3_auth', JSON.stringify({ token, user: payload }))
  return { token, user: payload }
}

export async function logout(){ await delay(100); localStorage.removeItem('exp3_auth'); return true }

export function restoreSession(){
  try{ const v = JSON.parse(localStorage.getItem('exp3_auth')); return v || null }catch(e){ return null }
}
