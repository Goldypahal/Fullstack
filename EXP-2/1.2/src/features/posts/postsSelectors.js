import { createSelector } from '@reduxjs/toolkit'

export const selectPostsState = state => state.posts

export const selectAllPosts = createSelector(
  selectPostsState,
  posts => posts.allIds.map(id => posts.byId[id])
)

export const selectPublishedPosts = createSelector(
  selectAllPosts,
  posts => posts.filter(p => p.status === 'published')
)

export const selectTotalPosts = createSelector(selectAllPosts, posts => posts.length)

export const selectRecentPosts = createSelector(
  selectAllPosts,
  posts => posts.slice(0,5)
)

export const selectPublishedCount = createSelector(
  selectPublishedPosts,
  published => published.length
)

export const selectPostsCountByPlatform = createSelector(
  selectAllPosts,
  posts => {
    const map = {}
    posts.forEach(p => { (p.platforms||[]).forEach(pl => { map[pl] = (map[pl] || 0) + 1 }) })
    return map
  }
)

// Factory: memoized selector for posts by platform
export const makeSelectPostsByPlatform = (platform) => createSelector(
  selectAllPosts,
  posts => posts.filter(p => p.platforms && p.platforms.includes(platform))
)

// Factory: memoized filtered posts selector (search + platform filters)
export const makeSelectFilteredPosts = ({ search = '', platforms = [] } = {}) => createSelector(
  selectAllPosts,
  posts => {
    const s = (search || '').trim().toLowerCase()
    const active = (platforms || [])
    return posts.filter(p => {
      if(active.length>0 && !(p.platforms || []).some(pl => active.includes(pl))) return false
      if(s){ const text = (p.content||'') + ' ' + (p.title||''); if(!text.toLowerCase().includes(s)) return false }
      return true
    })
  }
)

// Summary selector combining counts — memoized
export const selectPostsSummary = createSelector(
  selectTotalPosts,
  selectPublishedCount,
  selectPostsCountByPlatform,
  (total, published, byPlatform) => ({ total, published, byPlatform })
)
