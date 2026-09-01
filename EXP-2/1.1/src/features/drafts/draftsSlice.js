import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  byId: {},
  allIds: [],
  status: 'idle',
  error: null,
}

const loadFromStorage = () => {
  try{ return JSON.parse(localStorage.getItem('exp2_drafts')||'[]') }catch(e){ return [] }
}

const saveToStorage = (list) => localStorage.setItem('exp2_drafts', JSON.stringify(list))

const slice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    setDrafts(state, action){
      state.byId = {}; state.allIds = []
      (action.payload||[]).forEach(d=>{ state.byId[d.id]=d; state.allIds.push(d.id) })
    },
    addDraft: {
      reducer(state, action){ const d=action.payload; state.byId[d.id]=d; state.allIds.unshift(d.id); saveToStorage(state.allIds.map(id=>state.byId[id])) },
      prepare(draft){ return { payload: { id: nanoid(), ...draft, createdAt: Date.now(), updatedAt: Date.now() } } }
    },
    updateDraft(state, action){ const d=action.payload; if(state.byId[d.id]){ state.byId[d.id]={...state.byId[d.id],...d,updatedAt:Date.now()}; saveToStorage(state.allIds.map(id=>state.byId[id])) } },
    deleteDraft(state, action){ const id=action.payload; delete state.byId[id]; state.allIds=state.allIds.filter(x=>x!==id); saveToStorage(state.allIds.map(id=>state.byId[id])) },
    clearDrafts(state){ state.byId={}; state.allIds=[]; saveToStorage([]) }
  }
})

export const { setDrafts, addDraft, updateDraft, deleteDraft, clearDrafts } = slice.actions
export default slice.reducer

// initialize from storage helper
export const initializeDraftsFromStorage = () => dispatch => {
  const list = loadFromStorage()
  dispatch(slice.actions.setDrafts(list))
}
