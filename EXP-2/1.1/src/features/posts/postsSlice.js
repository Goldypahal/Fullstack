import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  byId: {},
  allIds: [],
  status: 'idle',
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      const posts = action.payload || []
      state.byId = {}
      state.allIds = []
      posts.forEach(p => { state.byId[p.id] = p; state.allIds.push(p.id) })
    },
    addPost: {
      reducer(state, action) {
        const p = action.payload
        state.byId[p.id] = p
        state.allIds.unshift(p.id)
      },
      prepare(post) {
        return { payload: { id: nanoid(), ...post, createdAt: Date.now(), updatedAt: Date.now() } }
      }
    },
    updatePost(state, action) {
      const p = action.payload
      if(state.byId[p.id]){
        state.byId[p.id] = { ...state.byId[p.id], ...p, updatedAt: Date.now() }
      }
    },
    deletePost(state, action) {
      const id = action.payload
      delete state.byId[id]
      state.allIds = state.allIds.filter(x=>x!==id)
    },
    clearPosts(state){ state.byId={}; state.allIds=[] }
  }
})

export const { setPosts, addPost, updatePost, deletePost, clearPosts } = postsSlice.actions
export default postsSlice.reducer
