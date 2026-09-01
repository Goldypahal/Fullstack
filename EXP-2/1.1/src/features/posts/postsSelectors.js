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

export const selectPostsByPlatform = platform => createSelector(
  selectAllPosts,
  posts => posts.filter(p => p.platforms && p.platforms.includes(platform))
)

export const selectTotalPosts = createSelector(selectAllPosts, posts => posts.length)

export const selectRecentPosts = createSelector(
  selectAllPosts,
  posts => posts.slice(0,5)
)

// Count of published posts
export const selectPublishedCount = createSelector(
  selectPublishedPosts,
  published => published.length
)

// Posts count grouped by platform: { platformId: count }
export const selectPostsCountByPlatform = createSelector(
  selectAllPosts,
  posts => {
    const map = {}
    posts.forEach(p => {
      (p.platforms || []).forEach(pl => { map[pl] = (map[pl] || 0) + 1 })
    })
    return map
  }
)

// Factory returning selector for posts filtered by platform (keeps memoization per-platform)
export const makeSelectPostsByPlatform = platform => createSelector(
  selectAllPosts,
  posts => posts.filter(p => p.platforms && p.platforms.includes(platform))
)
