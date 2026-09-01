import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Unauthorized from './pages/Unauthorized'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRoute from './components/RoleRoute'
import AdminPanel from './pages/AdminPanel'
import { useDispatch } from 'react-redux'
import { restoreSession as restore } from './features/auth/authSlice'
import { restoreSession as restoreService } from './features/auth/authService'

export default function App(){
  const dispatch = useDispatch()
  useEffect(()=>{ const s = restoreService(); if(s) dispatch(restore(s)) },[dispatch])

  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
      </nav>
      <main className="main">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/unauthorized" element={<Unauthorized/>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/admin" element={<RoleRoute allowedRoles={["admin"]}><AdminPanel/></RoleRoute>} />
          <Route path="/" element={<Login/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
