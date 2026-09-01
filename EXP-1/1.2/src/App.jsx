import React from 'react'
import DraftManager from './components/DraftManager'

export default function App(){
  return (
    <div className="app">
      <header className="app-header"><h1>Draft Manager</h1></header>
      <main className="app-main">
        <DraftManager />
      </main>
    </div>
  )
}
