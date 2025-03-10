import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { User } from '@sales-monitor-frontend/utils/types'

export interface AuthState {
  accessToken: string | null
  user: User | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    login: (
      state,
      action: PayloadAction<{
        accessToken: string
        user: User
      }>
    ) => {
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
      state.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('x-access-token', action.payload.accessToken)
    },
    logout: (state) => {
      state.accessToken = null
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('x-access-token')
      localStorage.removeItem('user')
    },
  },
})

// Action creators are generated for each case reducer function

export const { login } = AuthSlice.actions
export const { logout } = AuthSlice.actions
export const { updateUser } = AuthSlice.actions

export const getAuth = (state: RootState) => state.auth

export default AuthSlice.reducer
