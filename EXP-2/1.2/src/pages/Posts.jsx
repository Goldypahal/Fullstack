import React, { useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, makeSelectFilteredPosts } from '../features/posts/postsSelectors'
import { deletePost } from '../features/posts/postsSlice'
import PostCard from '../components/PostCard'
import { useSelector as useR } from 'react-redux'
import { togglePlatform } from '../features/platforms/platformsSlice'

export default function Posts(){
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const selectedPlatforms = useSelector(s=>s.platforms.selected)

  // Create a selector instance memoized for this component and current filter values
  const filteredSelector = useMemo(()=> makeSelectFilteredPosts({ search, platforms: selectedPlatforms }), [search, selectedPlatforms])
  const posts = useSelector(filteredSelector)

  const onDelete = useCallback(id=>dispatch(deletePost(id)),[dispatch])

  const toggle = useCallback((id)=> dispatch(togglePlatform(id)), [dispatch])

  return (
    <div>
      <h2>Posts</h2>
      <div style={{marginBottom:12}}>
        <input placeholder="Search posts" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>

      <div style={{marginBottom:12}}>
        <strong>Filter by platform:</strong>
        {' '}
        {useR(s=>s.platforms.available).map(p=> (
          <label key={p.id} style={{marginLeft:8}}>
            <input type="checkbox" checked={selectedPlatforms.includes(p.id)} onChange={()=>toggle(p.id)} /> {p.name}
          </label>
        ))}
      </div>

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
