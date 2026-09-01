import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Posts from './pages/Posts'
import Drafts from './pages/Drafts'
import CreatePost from './pages/CreatePost'
import './styles.css'

export default function App(){
  return (
    <BrowserRouter>
      <div className="shell">
        <nav className="nav">
          <Link to="/">Dashboard</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/drafts">Drafts</Link>
          <Link to="/create-post">Create Post</Link>
        </nav>
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/posts" element={<Posts/>} />
            <Route path="/drafts" element={<Drafts/>} />
            <Route path="/create-post" element={<CreatePost/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
