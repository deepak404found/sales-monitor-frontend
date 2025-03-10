import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AlertColor } from '@mui/material'

export interface AlertState {
  message: string
  severity: AlertColor
  open: boolean
  autoHideDuration?: number
}

const initialState: AlertState = {
  message: 'This is an info message',
  severity: 'info',
  open: false,
  autoHideDuration: 3000
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Omit<AlertState, 'open'>>) => {
      state.message = action.payload.message
      state.severity = action.payload.severity
      state.autoHideDuration = action.payload?.autoHideDuration
      state.open = true
    },
    closeAlert: (state) => {
      state.open = false
    }
  }
})

export const { setAlert, closeAlert } = alertSlice.actions

export const selectAlert = (state: RootState) => state.alert

export default alertSlice.reducer
