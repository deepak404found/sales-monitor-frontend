'use client'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar'
import React from 'react'

interface State extends SnackbarProps {
  severity: 'success' | 'warning' | 'error' | 'secondary' | 'info'
  handleClose: () => void
  onUndo?: () => void
  fill?: boolean
  duration: number
  showCloseIcon?: boolean
  showIcon?: boolean
  icon?: React.ReactElement
  message: string
}

/**
 * @name CustomSnackbar
 * @description Snackbars provide brief notifications. The component is also known as a toast.
 *  Snackbars inform users of a process that an app has performed or will perform.
 *  They appear temporarily, towards the bottom of the screen.
 * They shouldn't interrupt the user experience, and they don't require user input to disappear.
 * The CustomSnackbar component is a customizable Snackbar using Material-UI for React.
 * @param {'success' | 'warning' | 'error' | 'secondary' | 'info'} [type] - The type of the Snackbar (optional).
 * @param {() => void} handleClose - A callback function to handle Snackbar closure.
 * @param {() => void} [onUndo] - A callback function to perform when the "UNDO" button is clicked (optional).
 * @param {boolean} [fill=true] - Indicates whether the Snackbar should have a filled background (optional).
 * @param {number} [duration] - The duration (in milliseconds) the Snackbar should be displayed (optional).
 * @param {boolean} [open] - Indicates whether the Snackbar is open (optional).
 * @param showIcon - Indicates whether to show the icon (optional).
 * @param icon - The icon to display in the Snackbar (optional).
 * @param {string} [message] - The message text to display in the Snackbar (optional).
 * @returns The rendered CustomSnackbar component.
 *
 * @example
 *     <CustomSnackbar
 *        open={checked}
 *        type={'secondary'}
 *        // showUndo={false}
 *        fill={false}
 *        // fill={true}
 *        duration={10000}
 *        handleClose={() => setChecked(false)}
 *     />
 *
 */

export function CustomSnackbar({
  severity,
  handleClose,
  onUndo,
  fill = true,
  duration,
  open,
  showCloseIcon = true,
  showIcon = true,
  icon,
  message,
}: State) {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert
        onClose={showCloseIcon ? handleClose : undefined}
        icon={showIcon ? icon : false}
        sx={{
          width: '100%',
          height: '48px',
          padding: '8px 16px',
          alignItems: 'center',
          backgroundColor: fill
            ? severity === 'success'
              ? 'success.600'
              : severity === 'error'
              ? 'error.600'
              : severity === 'warning'
              ? 'warning.600'
              : severity === 'secondary'
              ? 'secondary.500'
              : severity === 'info'
              ? 'info.600'
              : '#2E2E2E'
            : '#2E2E2E',
          color:
            severity === 'success'
              ? 'success.600'
              : severity === 'error'
              ? 'error.600'
              : severity === 'warning'
              ? 'warning.600'
              : severity === 'secondary'
              ? 'secondary.500'
              : 'info.600',
          '& .MuiAlert-icon': {
            color:
              severity === 'success'
                ? 'success.600'
                : severity === 'error'
                ? 'error.600'
                : severity === 'warning'
                ? 'warning.600'
                : severity === 'secondary'
                ? 'secondary.500'
                : 'info.600',
          },
          '& .MuiAlert-action': {
            margin: '0px',
            padding: '0px',
          },
          '& .MuiAlert-root': {
            boxShadow: '0px 4px 6px -4px',
          },
          '& .MuiAlert-message': {
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            padding: '0px !important',
          },
          '& .MuiSvgIcon-root': {
            padding: '0px !important',
          },
          '& .MuiIconButton-root': {
            padding: '4px !important',
          },
        }}
        severity={severity === 'secondary' ? 'info' : severity}
      >
        {message || 'This is a success message'}
        {onUndo && (
          <Button
            variant="outlined"
            color={severity}
            size="small"
            onClick={onUndo}
            sx={{
              color:
                severity === 'success'
                  ? 'success.600'
                  : severity === 'error'
                  ? 'error.600'
                  : severity === 'warning'
                  ? 'warning.600'
                  : severity === 'secondary'
                  ? 'secondary.500'
                  : 'info.600',
              borderColor:
                severity === 'success'
                  ? 'success.600'
                  : severity === 'error'
                  ? 'error.600'
                  : severity === 'warning'
                  ? 'warning.600'
                  : severity === 'secondary'
                  ? 'secondary.500'
                  : 'info.600',

              '&.MuiButtonBase-root': {
                marginLeft: '8px',
              },
              ':hover': {
                '&.MuiButtonBase-root': {
                  borderColor:
                    severity === 'success'
                      ? 'success.600'
                      : severity === 'error'
                      ? 'error.600'
                      : severity === 'warning'
                      ? 'warning.600'
                      : severity === 'secondary'
                      ? 'secondary.500'
                      : 'info.600',
                  color:
                    severity === 'success'
                      ? 'success.600'
                      : severity === 'error'
                      ? 'error.600'
                      : severity === 'warning'
                      ? 'warning.600'
                      : severity === 'secondary'
                      ? 'secondary.500'
                      : 'info.600',
                },
              },
            }}
          >
            Undo
          </Button>
        )}
      </Alert>
    </Snackbar>
  )
}
