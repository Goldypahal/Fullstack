import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from '../features/posts/postsSlice'

export default function CreatePost(){
  const [content, setContent] = useState('')
  const dispatch = useDispatch()
  const submit = e=>{ e.preventDefault(); if(!content) return; dispatch(addPost({ content, platforms: ['twitter'] })); setContent('') }

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={submit}>
        <textarea value={content} onChange={e=>setContent(e.target.value)} rows={6} cols={60} />
        <div><button type="submit">Create</button></div>
      </form>
    </div>
  )
}
