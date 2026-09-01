import React from 'react'
import { useSelector } from 'react-redux'
import { selectTotalPosts, selectPublishedPosts, selectRecentPosts, selectPostsCountByPlatform } from '../features/posts/postsSelectors'
import { selectTotalDrafts } from '../features/drafts/draftsSelectors'
import PlatformStats from '../components/PlatformStats'

export default function Dashboard(){
  const totalPosts = useSelector(selectTotalPosts)
  const published = useSelector(selectPublishedPosts)
  const recent = useSelector(selectRecentPosts)
  const totalDrafts = useSelector(selectTotalDrafts)
  const postsByPlatform = useSelector(selectPostsCountByPlatform)

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat">Total Posts: <strong>{totalPosts}</strong></div>
        <div className="stat">Published: <strong>{published.length}</strong></div>
        <div className="stat">Drafts: <strong>{totalDrafts}</strong></div>
      </div>
      <section>
        <h3>Recent Posts</h3>
        {recent.length===0? <div className="muted">No posts yet</div> : (
          <ul>{recent.map(p=>(<li key={p.id}>{p.content?.slice(0,80)||'(empty)'} — <small>{new Date(p.updatedAt).toLocaleString()}</small></li>))}</ul>
        )}
      </section>
      <section style={{marginTop:12}}>
        <h3>Posts per Platform</h3>
        <PlatformStats counts={postsByPlatform} />
      </section>
    </div>
  )
}
