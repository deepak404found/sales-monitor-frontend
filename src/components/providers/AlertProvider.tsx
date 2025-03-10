'use client'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeAlert, selectAlert } from '../../global/reducers/alert'
import { CustomSnackbar } from '../snackbar'

React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function AlertProvider({ children }: React.PropsWithChildren) {
  const alertState = useSelector(selectAlert)
  const dispatch = useDispatch()

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event?.preventDefault()
    if (reason === 'clickaway') {
      return
    }
    dispatch(closeAlert())
  }

  // console.log('alertState', alertState)

  return (
    <>
      <CustomSnackbar
        open={alertState?.open}
        autoHideDuration={alertState?.autoHideDuration}
        handleClose={handleClose}
        severity={alertState?.severity}
        message={alertState?.message}
        duration={alertState?.autoHideDuration || 3000}
      />
      {children}
    </>
  )
}
