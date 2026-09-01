import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../features/posts/postsSlice'
import { selectTotalPosts } from '../features/posts/postsSelectors'

export default function CreatePost(){
  const [content,setContent] = useState('')
  const [platforms,setPlatforms] = useState([])
  const dispatch = useDispatch()
  const total = useSelector(selectTotalPosts)

  function submit(){
    dispatch(addPost({ content, platforms, status: 'draft' }))
    setContent('')
    setPlatforms([])
  }

  return (
    <div>
      <h2>Create Post</h2>
      <div className="form">
        <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Write..." />
        <div className="form-actions">
          <button onClick={submit}>Add Post</button>
          <div className="muted">Total posts: {total}</div>
        </div>
      </div>
    </div>
  )
}
