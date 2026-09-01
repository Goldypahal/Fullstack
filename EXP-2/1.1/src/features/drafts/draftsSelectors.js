import { createSelector } from '@reduxjs/toolkit'
export const selectDraftsState = state => state.drafts
export const selectAllDrafts = createSelector(selectDraftsState, d => d.allIds.map(id=>d.byId[id]))
export const selectTotalDrafts = createSelector(selectAllDrafts, d=>d.length)
export const selectDraftById = id => createSelector(selectDraftsState, d => d.byId[id] || null)
