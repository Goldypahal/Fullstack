import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts } from '../features/posts/postsSelectors'
import { deletePost } from '../features/posts/postsSlice'
import PostCard from '../components/PostCard'

export default function Posts(){
  const posts = useSelector(selectAllPosts)
  const dispatch = useDispatch()
  const onDelete = useCallback(id=>dispatch(deletePost(id)),[dispatch])

  return (
    <div>
      <h2>Posts</h2>
      {posts.length===0? <div className="muted">No posts</div> : (
        <ul className="list">
          {posts.map(p=> (
            <PostCard key={p.id} post={p} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  )
}
