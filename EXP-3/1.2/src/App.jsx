import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import EditorPanel from './pages/EditorPanel'
import ViewerPanel from './pages/ViewerPanel'
import Unauthorized from './pages/Unauthorized'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRoute from './components/RoleRoute'
import { useDispatch } from 'react-redux'
import { restoreSession as restoreAction } from './features/auth/authSlice'
import { restoreSession } from './features/auth/authService'

export default function App(){
  const dispatch = useDispatch()
  useEffect(()=>{ const s = restoreSession(); if(s) dispatch(restoreAction(s)) },[dispatch])

  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/editor">Editor</Link>
        <Link to="/viewer">Viewer</Link>
        <Link to="/login">Login</Link>
      </nav>
      <main className="main">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/unauthorized" element={<Unauthorized/>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/admin" element={<RoleRoute allowedRoles={["admin"]}><AdminPanel/></RoleRoute>} />
          <Route path="/editor" element={<RoleRoute allowedRoles={["admin","editor"]}><EditorPanel/></RoleRoute>} />
          <Route path="/viewer" element={<RoleRoute allowedRoles={["admin","editor","viewer"]}><ViewerPanel/></RoleRoute>} />
          <Route path="/" element={<Login/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
