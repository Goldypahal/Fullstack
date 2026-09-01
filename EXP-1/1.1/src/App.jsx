import React from 'react'
import PostComposer from './components/PostComposer'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Multi-Platform Post Composer</h1>
      </header>
      <main className="app-main">
        <PostComposer />
      </main>
      <footer className="app-footer">EXP-1/1.1 — Dynamic post composer</footer>
    </div>
  )
}
