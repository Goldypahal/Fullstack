import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  available: [
    { id:'twitter', name:'X (Twitter)' },
    { id:'instagram', name:'Instagram' },
    { id:'facebook', name:'Facebook' },
    { id:'linkedin', name:'LinkedIn' }
  ],
  selected: ['twitter']
}

const slice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    selectPlatform(state, action){ if(!state.selected.includes(action.payload)) state.selected.push(action.payload) },
    deselectPlatform(state, action){ state.selected = state.selected.filter(x=>x!==action.payload) },
    togglePlatform(state, action){ const id=action.payload; state.selected = state.selected.includes(id)? state.selected.filter(x=>x!==id): [...state.selected,id] },
    clearPlatforms(state){ state.selected = [] }
  }
})

export const { selectPlatform, deselectPlatform, togglePlatform, clearPlatforms } = slice.actions
export default slice.reducer
