import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authService from './authService'

export const login = createAsyncThunk('auth/login', async (creds, thunkAPI) => {
  try{ return await authService.login(creds) }catch(e){ return thunkAPI.rejectWithValue(e.message) }
})

export const logout = createAsyncThunk('auth/logout', async ()=>{ await authService.logout(); return true })

const initialState = { user: null, token: null, isAuthenticated: false, status: 'idle', error: null }

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreSession(state, action){ const v = action.payload; if(v){ state.user=v.user; state.token=v.token; state.isAuthenticated=true } }
  },
  extraReducers: builder=>{
    builder
      .addCase(login.pending, s=>{ s.status='loading'; s.error=null })
      .addCase(login.fulfilled, (s,a)=>{ s.status='succeeded'; s.user=a.payload.user; s.token=a.payload.token; s.isAuthenticated=true })
      .addCase(login.rejected, (s,a)=>{ s.status='failed'; s.error=a.payload||a.error.message })
      .addCase(logout.fulfilled, s=>{ s.user=null; s.token=null; s.isAuthenticated=false; s.status='idle' })
  }
})

export const { restoreSession } = slice.actions
export default slice.reducer
