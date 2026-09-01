import React from 'react'

function PostCard({ post, onDelete }){
  return (
    <li className="card">
      <div>{post.content?.slice(0,120) || '(empty)'}</div>
      <div className="meta">{post.platforms?.join(', ')}</div>
      <div className="actions"><button onClick={() => onDelete(post.id)}>Delete</button></div>
    </li>
  )
}

export default React.memo(PostCard)
