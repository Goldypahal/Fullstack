import React, { useEffect, useState } from 'react'
import * as api from '../mockApi'

function makeId(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2,7)
}

export default function DraftManager(){
  const [drafts, setDrafts] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [selected, setSelected] = useState(null)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  useEffect(()=>{
    loadDrafts()
  },[])

  async function loadDrafts(){
    setLoading(true)
    try{
      const list = await api.getDrafts()
      setDrafts(list)
    }finally{setLoading(false)}
  }

  function newDraft(){
    setSelected(null)
    setTitle('')
    setContent('')
  }

  async function save(){
    setSaving(true)
    try{
      const d = selected ? { id: selected.id, title, content, updatedAt: Date.now() } : { id: makeId(), title, content }
      const saved = await api.saveDraft(d)
      await loadDrafts()
      setSelected(saved)
    }catch(e){
      console.error(e)
    }finally{setSaving(false)}
  }

  async function remove(id){
    if(!confirm('Delete draft?')) return
    setLoading(true)
    try{
      await api.deleteDraft(id)
      await loadDrafts()
      if(selected && selected.id === id) newDraft()
    }finally{setLoading(false)}
  }

  async function loadIntoEditor(id){
    setLoading(true)
    try{
      const d = await api.getDraft(id)
      if(d){
        setSelected(d)
        setTitle(d.title || '')
        setContent(d.content || '')
      }
    }finally{setLoading(false)}
  }

  return (
    <div className="dm">
      <div className="panel editor">
        <div className="editor-head">
          <input placeholder="Draft title" value={title} onChange={e=>setTitle(e.target.value)} />
          <div className="editor-actions">
            <button onClick={newDraft}>New</button>
            <button onClick={save} disabled={saving}>{saving? 'Saving...' : 'Save Draft'}</button>
          </div>
        </div>
        <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Write your draft..." />
      </div>

      <aside className="panel list">
        <h3>Saved Drafts</h3>
        {loading ? <div className="muted">Loading...</div> : (
          drafts.length === 0 ? <div className="muted">No drafts yet</div> : (
            <ul>
              {drafts.map(d => (
                <li key={d.id} className={selected && selected.id===d.id ? 'active' : ''}>
                  <div className="meta">
                    <strong>{d.title || '(untitled)'}</strong>
                    <div className="ts">{new Date(d.updatedAt||d.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="actions">
                    <button onClick={()=>loadIntoEditor(d.id)}>Load</button>
                    <button onClick={()=>{setSelected(d); setTitle(d.title||''); setContent(d.content||'')}}>Edit</button>
                    <button onClick={()=>remove(d.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </aside>
    </div>
  )
}
