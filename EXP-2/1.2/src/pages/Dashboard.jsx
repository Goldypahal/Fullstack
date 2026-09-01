import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostsSummary, selectRecentPosts } from '../features/posts/postsSelectors'
import { selectTotalDrafts } from '../features/drafts/draftsSelectors'
import PlatformStats from '../components/PlatformStats'

export default function Dashboard(){
  const summary = useSelector(selectPostsSummary)
  const recent = useSelector(selectRecentPosts)
  const totalDrafts = useSelector(selectTotalDrafts)

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat">Total Posts: <strong>{summary.total}</strong></div>
        <div className="stat">Published: <strong>{summary.published}</strong></div>
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
        <PlatformStats counts={summary.byPlatform} />
      </section>
    </div>
  )
}
