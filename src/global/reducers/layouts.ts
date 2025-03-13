import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface LayoutState {
  sidebarOpen: boolean
}

const initialState: LayoutState = {
  sidebarOpen: false,
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    openSidebar: (state) => {
      state.sidebarOpen = true
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false
    },
  },
})

export const { toggleSidebar, openSidebar, closeSidebar } = layoutSlice.actions

export const selectLayout = (state: RootState) => state.layout

export default layoutSlice.reducer
